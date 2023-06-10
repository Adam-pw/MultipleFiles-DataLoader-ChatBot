# Loading Data from with Multiple Files
This Readme demonstrates how to load data from a folder that contains multiple files using loaders. Each file in the folder is processed using a matching loader based on its file extension, and the resulting documents are concatenated together.

## Folder Structure
Here is an example folder structure that we will be working with:

```bash
src/document_loaders/example_data/example/
├── example.json
├── example.jsonl
├── example.txt
└── example.csv
```
## Code Example
The following code snippet demonstrates how to load data from the folder using loaders:

```javascript
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { JSONLoader, JSONLinesLoader } from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "langchain/document_loaders/fs/csv";


const loader = new DirectoryLoader(
  "Your files path",
  {
    ".json": (path) => new JSONLoader(path, "/texts"),
    ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
    ".txt": (path) => new TextLoader(path),
    ".csv": (path) => new CSVLoader(path, "text"),
  }
);

const docs = await loader.load();
console.log({ docs });
```

In this code, we import the necessary loaders for different file types from the `langchain/document_loaders/fs` module. We then create a DirectoryLoader instance by providing the path to the folder `Your files path` and a map of file extensions to loader factories.

The loader factory functions define how each file should be loaded. In this example, we have defined loaders for four different file extensions: `.json`, `.jsonl`, `.txt`, and `.csv`. Each loader factory function takes the file path as a parameter and returns an instance of the corresponding loader.

Once the loader is set up, we call the load method to load the data from the folder. The load method returns a promise, so we use await to wait for the documents to be loaded. Finally, we log the loaded documents to the console.

### Note: 
The code provided assumes that the necessary dependencies and modules are properly installed and imported. Make sure to install the required packages and set up the file system loaders accordingly.

Feel free to modify the code example and the folder structure according to your specific use case.