import xs from 'xstream';
import { view as domView } from './dom';
import {
  Event,
  EventType,
  RequestEvent,
  StateEvent
} from '../event';

const select = <T extends Event>(
  event$: xs<Event>, type: EventType
): xs<T> => {
  return event$.filter((event) => event.type === type) as xs<T>;
};

const view = (event$: xs<Event>): { DOM: xs<any>; HTTP: xs<any>; } => {
  const sinks = {
    DOM: domView(select<StateEvent>(event$, 'state')),
    HTTP: select<RequestEvent>(event$, 'request').map(({ request }) => request)
  };
  return sinks;
};

export { view };
