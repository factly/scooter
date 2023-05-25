import { ScooterCore } from '@factly/scooter-core';
import { useState } from 'react';
import axios from 'axios';

export function App() {
  const [value, setValue] = useState("<p>hello tagore</p>");
  return (
    <>
      <h1 className="">Scooter demo</h1>
      <ScooterCore 
       initialValue={value}
       menuType="bubble"
       heightStrategy="flexible"
       rows={20}
       onChange={data => {
         setValue(data.html);
       }}
       editorInstance={editor => {
         return;
       }}
       tagoreConfig={{
         fetcher: async (input, options) => {
            const response = await axios.post(
              `http://localhost:8080/prompts/generate`,
              {
                input: `${input}\n Return the response as a valid HTML without html, head or body tags`,
                max_tokens: 200,
              },
              { headers: { "X-User": "20" } }
            );
          
            // Handle the response here
            console.log(response.data);
          
           const data = response.data;
           console.log(data, "data from tagore")
           return data;
         },
         menuItems: {},
       }}
      />
       {value.toString()}
    </>
  );
}
export default App;
if (import.meta.vitest) {
  // add tests related to your file here
  // For more information please visit the Vitest docs site here: https://vitest.dev/guide/in-source.html
  const { it, expect, beforeEach } = import.meta.vitest;
  let render;
  beforeEach(async () => {
    render = (await import('@testing-library/react')).render;
  });
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
  it('should have a greeting as the title', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Welcome test/gi)).toBeTruthy();
  });
}
