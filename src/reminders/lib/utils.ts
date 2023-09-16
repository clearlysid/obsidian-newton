import { execa } from 'execa';

// @ts-expect-error
import createList from './jxa/create-list.jxa';
// @ts-expect-error
import createReminder from './jxa/create-reminder.jxa';
// @ts-expect-error
import deleteReminder from './jxa/delete-reminder.jxa';
// @ts-expect-error
import getList from './jxa/get-list.jxa';
// @ts-expect-error
import getLists from './jxa/get-lists.jxa';
// @ts-expect-error
import getReminder from './jxa/get-reminder.jxa';
// @ts-expect-error
import getReminders from './jxa/get-reminders.jxa';
// @ts-expect-error
import updateReminder from './jxa/update-reminder.jxa';

export const JXA_SCRIPTS = {
  createList,
  createReminder,
  deleteReminder,
  getList,
  getLists,
  getReminder,
  getReminders,
  updateReminder,
};

export async function execJXA<T, R = {}>(scriptPath: string, data?: R): Promise<T> {
  const prefix = process.env.NODE_ENV === 'test' ? 'test' : '';

  const { stderr } = await execa(prefix + 'osascript', [
    '-l',
    'JavaScript',
    '-e',
    scriptPath,
    JSON.stringify(data),
  ]);

  return JSON.parse(stderr);
}

/**
 * Takes an object and return an equivalent object with string dates converted to Date objects
 */
export function withParsedDates<T extends { readonly [key: string]: any }>(data: T): T {
  const dateProps: ReadonlyArray<any> = [
    'completionDate',
    'creationDate',
    'dueDate',
    'modificationDate',
    'remindMeDate',
  ];
  const final = Object.keys(data).reduce((obj, prop) => {
    const isDate = dateProps.indexOf(prop) !== -1;
    const val = data[prop];
    const newObj = { ...obj, [prop]: isDate ? new Date(val) : val };
    return newObj;
  }, {});
  return final as T;
}