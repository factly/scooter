import { ScooterCore } from '@factly/scooter-core';
export function App() {
  return (
    <>
      <h1 className="">Scooter demo</h1>
      <ScooterCore />
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
