import React from "react";
import { SSE } from "sse";
import axios from "axios";
import { Embed } from "@factly/scooter-embed";
import { TagoreAI } from "@factly/scooter-tagore";
import { EditorView as ScooterEditorView } from "@factly/scooter-react";
export function App() {
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <ScooterEditorView
        menuType="bubble"
        heightStrategy="flexible"
        rows={20}
        editorInstance={() => {
          return;
        }}
        extensions={[Embed, TagoreAI]}
        meta={{
          claims: {
            1: { id: 1, claim: "Claim 1", fact: "Fact 1" },
            2: { id: 2, claim: "Claim 2", fact: "Fact 2" },
            3: { id: 3, claim: "Claim 3", fact: "Fact 3" },
            4: { id: 4, claim: "Claim 4", fact: "Fact 4" },
          },
        }}
        claimConfig={{
          ratingsFetcher: (page = 1) => {
            // Replace this with your actual API call to fetch ratings
            const newRatings = Array.from({ length: 20 }, (_, index) => ({
              id: index + 1 + (page - 1) * 20,
              name: `Rating ${index + 1 + (page - 1) * 20}`,
            }));
            return new Promise(resolve => {
              setTimeout(() => {
                resolve({ nodes: newRatings, total: 100 });
              }, 1000);
            });
          },
          claimantsFetcher: (page = 1) => {
            // Replace this with your actual API call to fetch claimants
            const newClaimants = Array.from({ length: 1 }, (_, index) => ({
              id: index + 1 + (page - 1) * 1,
              name: `Claimant ${index + 1 + (page - 1) * 1}`,
            }));
            return new Promise(resolve => {
              setTimeout(() => {
                resolve({ nodes: newClaimants, total: 100 });
              }, 1000);
            });
          },
          claimsFetcher: (searchTerm, page = 1, limit = 10) => {
            return new Promise((resolve, reject) => {
              // Check if page is a valid number, default to 1 if not provided or invalid
              const pageNumber = Number.isInteger(page) && page > 0 ? page : 1;

              // Simulating API delay with setTimeout
              setTimeout(() => {
                // Simulated API response
                const claims = [
                  {
                    id: pageNumber,
                    order: pageNumber,
                    claim:
                      "Claim" + pageNumber + (searchTerm ? searchTerm : ""),
                    fact: "Fact" + pageNumber,
                  },
                  {
                    id: pageNumber + 1,
                    order: pageNumber + 1,
                    claim:
                      "Claim" +
                      (pageNumber + 1) +
                      (searchTerm ? searchTerm : ""),
                    fact: "Fact" + (pageNumber + 1),
                  },
                  {
                    id: pageNumber + 2,
                    order: pageNumber + 2,
                    claim:
                      "Claim" +
                      (pageNumber + 2) +
                      (searchTerm ? searchTerm : ""),
                    fact: "Fact" + (pageNumber + 2),
                  },
                ];
                resolve({ nodes: claims, total: 100 });
              }, 1000);
            });
          },
          addClaim: values => {
            // Replace this with your actual API call to post data and receive the form data with ID
            return new Promise(resolve => {
              setTimeout(() => {
                const generatedId = "12345"; // Replace '12345' with the generated ID from the backend
                const formDataWithId = {
                  ...values,
                  id: generatedId,
                };
                resolve(formDataWithId);
              }, 1000); // Simulating a delay of 1 second
            });
          },
        }}
        tagoreConfig={{
          stream: true,
          sse: (input, selectedOption) => {
            let source = new SSE("http://localhost:8080/prompts/generate", {
              headers: {
                "X-User": "1",
                "X-Organisation": "1",
                //  max_tokens: 2000
              },
              method: "POST",
              payload: JSON.stringify({
                input: input,
                generate_for: selectedOption,
                provider: "openai",
                stream: true,
                model: "text-davinci-003", //"gpt-3.5-turbo",
                additional_instructions:
                  "The generated text should be valid html body tags(IMPORTANT). Avoid other tags like <html>, <body>. avoid using newlines in the generated text.",
                max_tokens: 2000,
              }),
            });

            return source;
          },

          fetcher: async (input, selectedOption) => {
            const response = await axios.post(
              `http://localhost:8080/prompts/generate`,
              {
                input: input,
                generate_for: selectedOption,
                provider: "openai",
                stream: false,
                model: "gpt-3.5-turbo",
                additional_instructions:
                  "The generated text should be valid html body tags(IMPORTANT). Avoid other tags like <html>, <body>. avoid using newlines in the generated text.",
              },
              { headers: { "X-User": "20" } }
            );
            // ${systemPrompt}
            const data = response.data;
            return data;
          },
          menuItems: {},
        }}
        // uploadEndpoint={window.REACT_APP_COMPANION_URL}
        // iframelyEndpoint={window.REACT_APP_IFRAMELY_URL}
        // imagesFetcher={currentPage =>
        //   axios
        //     .get(MEDIA_API, {
        //       params: { page: currentPage, limit: 12 },
        //     })
        //     .then(res => res.data)
        // }
        // onFileAdded={file => {
        //   const data = file.data;
        //   const url = data.thumbnail
        //     ? data.thumbnail
        //     : URL.createObjectURL(data);
        //   const image = new Image();
        //   image.src = url;
        //   image.onload = () => {
        //     // uppy.setFileMeta(file.id, { width: image.width, height: image.height });
        //     URL.revokeObjectURL(url);
        //   };
        //   image.onerror = () => {
        //     URL.revokeObjectURL(url);
        //   };
        // }}
        // onUploadComplete={result => {
        //   const successful = result.successful[0];
        //   const { meta } = successful;
        //   const upload = {};
        //   upload["alt_text"] = meta.caption;
        //   upload["caption"] = meta.caption;
        //   upload["description"] = meta.caption;
        //   upload["dimensions"] = `${meta.width}x${meta.height}`;
        //   upload["file_size"] = successful.size;
        //   upload["name"] = successful.fileName;
        //   upload["slug"] = successful.response.body.key;
        //   upload["title"] = meta.caption ? meta.caption : " ";
        //   upload["type"] = successful.meta.type;
        //   upload["url"] = {};
        //   upload["url"]["raw"] = successful.uploadURL;

        //   axios.post(MEDIA_API, [upload]).catch(error => {
        //     console.error(error);
        //   });
        // }}
        // uploadConfig={{
        //   restrictions: {
        //     maxFileSize: 5242880,
        //     allowedFileTypes: [".jpg", ".jpeg", ".png", ".gif"],
        //   },
        //   onBeforeUpload: files => {
        //     const updatedFiles = {};

        //     Object.keys(files).forEach(fileID => {
        //       updatedFiles[fileID] = {
        //         ...files[fileID],
        //         fileName: files[fileID].meta.name,
        //         meta: {
        //           ...files[fileID].meta,
        //           name:
        //             space_slug +
        //             "/" +
        //             new Date().getFullYear() +
        //             "/" +
        //             new Date().getMonth() +
        //             "/" +
        //             Date.now().toString() +
        //             "_" +
        //             files[fileID].meta.name,
        //         },
        //       };
        //     });
        //     return updatedFiles;
        //   },
        // }}
      />
    </div>
  );
}
export default App;
if (import.meta.vitest) {
  // add tests related to your file here
  // For more information please visit the Vitest docs site here: https://vitest.dev/guide/in-source.html
  const { it, expect, beforeEach } = import.meta.vitest;
  let render;
  beforeEach(async () => {
    render = (await import("@testing-library/react")).render;
  });
  it("should render successfully", () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
  it("should have a greeting as the title", () => {
    const { getByText } = render(<App />);
    expect(getByText(/Welcome test/gi)).toBeTruthy();
  });
}
