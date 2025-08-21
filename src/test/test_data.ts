const FAKE_API_SINGLE_FILE = [
  {
    "type": "pdf",
    "name": "Simple Test File",
    "added": "2017-01-06"
  }
]

const FAKE_API_MULTI_FILES = [
  {
    "type": "pdf",
    "name": "00 Simple Test File",
    "added": "2017-01-05"
  },
  {
    "type": "doc",
    "name": "01 Simple Test File",
    "added": "2017-01-06"
  }
]

// 'name' and 'added' have been placed purposely for order testing
const FAKE_API_MULTI_FILES_UNORDERED = [
  {
    "type": "pdf",
    "name": "AAA First File",
    "added": "2017-01-06"
  },
  {
    "type": "pdf",
    "name": "ZZZ Last File",
    "added": "2025-01-01"
  },
  {
    "type": "doc",
    "name": "BBB Second File",
    "added": "1980-01-01"
  }
]

const FAKE_API_FOLDER_AND_FILES = [
  {
    "type": "pdf",
    "name": "File Level 1",
    "added": "2017-01-06"
  },
  {
    "type": "folder",
    "name": "Test Folder",
    "files": FAKE_API_MULTI_FILES_UNORDERED
  }
]

export default {
  FAKE_API_SINGLE_FILE,
  FAKE_API_MULTI_FILES,
  FAKE_API_MULTI_FILES_UNORDERED,
  FAKE_API_FOLDER_AND_FILES
}