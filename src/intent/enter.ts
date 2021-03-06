import xs from 'xstream';
import { Command } from '../command';
import { DOMSource } from '@cycle/dom';

const intent = ({ DOM }: { DOM: DOMSource }): xs<Command> => {
  const click$: xs<Event> = DOM.select('div.enter').events('click');
  const enter$: xs<Command> = click$.map<Command>(() => ({ type: 'enter' }));
  return enter$;
};

export { intent };
