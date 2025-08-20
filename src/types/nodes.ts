// Example structure:
//
// {
//     "type": "folder",
//     "name": "Expenses",
//     "files":
//     [
//         {
//             "type": "doc",
//             "name": "Expenses claim form",
//             "added": "2017-05-02"
//         },
//         {
//             "type": "doc",
//             "name": "Fuel allowances",
//             "added": "2017-05-03"
//         }
//     ]
// },

// TODO: Just use a string. Can not be sure if these will change
export type NoteType = 'folder' | 'doc' | 'csv' | 'pdf'

export interface Node {
  type: NoteType;
  name: string;
  files?: Node[];
  added?: string; // Ex: '2017-05-03'
}

