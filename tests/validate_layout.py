#!/usr/bin/env python3
from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import sys

INDEX_PATH = Path(__file__).resolve().parents[1] / 'index.html'

class IdCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: dict[str, dict[str, object]] = {}
        self.stack: list[tuple[str, str | None]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str]]) -> None:
        attr_dict = dict(attrs)
        ancestor_ids = [entry_id for _, entry_id in self.stack if entry_id]
        element_id = attr_dict.get('id')
        if element_id:
            self.ids[element_id] = {'tag': tag, 'ancestors': list(ancestor_ids), 'attrs': attr_dict}
        self.stack.append((tag, element_id))

    def handle_endtag(self, tag: str) -> None:
        for index in range(len(self.stack) - 1, -1, -1):
            stack_tag, _ = self.stack[index]
            if stack_tag == tag:
                del self.stack[index:]
                break

def fail(message: str) -> None:
    print(f'Layout validation failed: {message}', file=sys.stderr)
    sys.exit(1)

def main() -> None:
    if not INDEX_PATH.exists():
        fail('index.html konnte nicht gefunden werden.')

    html = INDEX_PATH.read_text(encoding='utf-8')

    for marker in ('<<<<<<<', '=======', '>>>>>>>'):
        if marker in html:
            fail(f'Merge-Konflikt-Markierung "{marker}" gefunden.')

    collector = IdCollector()
    collector.feed(html)

    required_ids = {
        'app',
        'game',
        'map',
        'status-window',
        'mine-window',
        'logistics-window',
        'research-window',
        'guild-window',
        'community-window',
        'world-events',
        'world-guilds',
        'open-login',
        'open-register',
        'open-game',
        'auth-modal',
        'login-form',
        'register-form',
        'mine-modal',
        'mine-form',
        'trade-resource',
        'trade-sell',
        'upgrade-logistics',
        'logout',
        'settings-button',
        'help-button',
        'settings-modal',
        'help-modal',
        'settings-form',
        'window-scale',
        'map-scale',
        'window-tab-bar',
        'mine-frames',
        'tutorial',
        'tutorial-reset',
        'guild-resource-ledger',
    }

    missing = sorted(required_ids - collector.ids.keys())
    if missing:
        fail(f'Folgende IDs fehlen: {", ".join(missing)}')

    ancestor_expectations = {
        'world-events': 'community-window',
        'world-guilds': 'community-window',
        'mine-form': 'mine-modal',
        'trade-resource': 'logistics-window',
        'research-list': 'research-window',
    }

    for child_id, ancestor_id in ancestor_expectations.items():
        info = collector.ids.get(child_id)
        if not info:
            fail(f'Element mit ID "{child_id}" wurde nicht gefunden.')
        if ancestor_id not in info['ancestors']:
            fail(f'Element "{child_id}" liegt nicht im erwarteten Bereich "{ancestor_id}".')

    if 'class="window-body community-body"' not in html:
        fail('Community-Fenster besitzt nicht die erwartete Layout-Klasse.')

    hud_windows = [key for key in collector.ids if key.endswith('-window')]
    if len(hud_windows) < 5:
        fail('Es wurden weniger als fünf HUD-Fenster registriert.')

    print('Layout validation passed.')

 
if __name__ == '__main__':
    main()
