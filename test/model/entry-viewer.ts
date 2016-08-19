import * as assert from 'power-assert';
import beater from 'beater';

import { EntryViewer } from '../../src/model/entry-viewer';

const { test } = beater();

test('focusNext', () => {
  const entries = new Array(31).fill(0).map((_, i) => 31 - i).map((n) => {
    const s = n < 10 ? '0' + n : n.toString(10);
    return { id: `2016-01-${s}`, title: `Entry ${s}`, body: `Entry Body ${s}` };
  });
  assert(entries.length === 31);
  assert(entries[0].id === '2016-01-31');

  const empty = EntryViewer.create([]);
  assert(empty.filteredEntries.length === 0);
  assert(empty.focusedEntryId === null);
  assert(empty.selectedEntry === null);
  assert(empty.selectedEntryId === null);

  const next0 = EntryViewer.create(entries);
  assert(next0.filteredEntries.length === 10);
  assert(next0.filteredEntries[0].id === '2016-01-31');
  assert(next0.focusedEntryId === '2016-01-31');
  assert(next0.selectedEntry === null);
  assert(next0.selectedEntryId === null);

  const next1 = next0.focusNext();
  assert(next1.filteredEntries.length === 10);
  assert(next1.filteredEntries[0].id === '2016-01-31');
  assert(next1.focusedEntryId === '2016-01-30');
  assert(next1.selectedEntry === null);
  assert(next1.selectedEntryId === null);

  const next10 = new Array(10).fill(0).reduce((e, _) => e.focusNext(), next0);
  assert(next10.filteredEntries.length === 10);
  assert(next10.filteredEntries[0].id === '2016-01-30');
  assert(next10.focusedEntryId === '2016-01-21');
  assert(next10.selectedEntry === null);
  assert(next10.selectedEntryId === null);

  const next30 = new Array(30).fill(0).reduce((e, _) => e.focusNext(), next0);
  assert(next30.filteredEntries.length === 10);
  assert(next30.filteredEntries[0].id === '2016-01-10');
  assert(next30.focusedEntryId === '2016-01-01');
  assert(next30.selectedEntry === null);
  assert(next30.selectedEntryId === null);

  const next31 = new Array(31).fill(0).reduce((e, _) => e.focusNext(), next0);
  assert(next31.filteredEntries.length === 10);
  assert(next31.filteredEntries[0].id === '2016-01-10');
  assert(next31.focusedEntryId === '2016-01-01');
  assert(next31.selectedEntry === null);
  assert(next31.selectedEntryId === null);
});

test('focusPrev', () => {
  const entries = new Array(31).fill(0).map((_, i) => 31 - i).map((n) => {
    const s = n < 10 ? '0' + n : n.toString(10);
    return { id: `2016-01-${s}`, title: `Entry ${s}`, body: `Entry Body ${s}` };
  });
  assert(entries.length === 31);
  assert(entries[0].id === '2016-01-31');

  const empty = EntryViewer.create([]);
  assert(empty.filteredEntries.length === 0);
  assert(empty.focusedEntryId === null);
  assert(empty.selectedEntry === null);
  assert(empty.selectedEntryId === null);

  const prev0 = EntryViewer.create(entries);
  assert(prev0.filteredEntries.length === 10);
  assert(prev0.filteredEntries[0].id === '2016-01-31');
  assert(prev0.focusedEntryId === '2016-01-31');
  assert(prev0.selectedEntry === null);
  assert(prev0.selectedEntryId === null);

  const next30 = new Array(30).fill(0).reduce((e, _) => e.focusNext(), prev0);
  assert(next30.filteredEntries.length === 10);
  assert(next30.filteredEntries[0].id === '2016-01-10');
  assert(next30.focusedEntryId === '2016-01-01');
  assert(next30.selectedEntry === null);
  assert(next30.selectedEntryId === null);

  const prev1 = next30.focusPrev();
  assert(prev1.filteredEntries.length === 10);
  assert(prev1.filteredEntries[0].id === '2016-01-10');
  assert(prev1.focusedEntryId === '2016-01-02');
  assert(prev1.selectedEntry === null);
  assert(prev1.selectedEntryId === null);

  const prev10 = new Array(10).fill(0).reduce((e, _) => e.focusPrev(), next30);
  assert(prev10.filteredEntries.length === 10);
  assert(prev10.filteredEntries[0].id === '2016-01-11');
  assert(prev10.focusedEntryId === '2016-01-11');
  assert(prev10.selectedEntry === null);
  assert(prev10.selectedEntryId === null);

  const prev30 = new Array(30).fill(0).reduce((e, _) => e.focusPrev(), next30);
  assert(prev30.filteredEntries.length === 10);
  assert(prev30.filteredEntries[0].id === '2016-01-31');
  assert(prev30.focusedEntryId === '2016-01-31');
  assert(prev30.selectedEntry === null);
  assert(prev30.selectedEntryId === null);

  const prev31 = new Array(31).fill(0).reduce((e, _) => e.focusPrev(), next30);
  assert(prev31.filteredEntries.length === 10);
  assert(prev31.filteredEntries[0].id === '2016-01-31');
  assert(prev31.focusedEntryId === '2016-01-31');
  assert(prev31.selectedEntry === null);
  assert(prev31.selectedEntryId === null);
});