import * as Api from './api';

export { Api };

// PS: If you're wondering what the Services type is in the epics signature and
// how to declare it in your application to easily inject statically typed API
// clients to your epics also ensuring for easy mocking while testing resulting
// in clean architecture, please create an issue for it and perhaps I'll find
// some time in the future to write an article about it.
// (https://github.com/piotrwitek/typesafe-actions)
export type Services = { Api: typeof Api };
