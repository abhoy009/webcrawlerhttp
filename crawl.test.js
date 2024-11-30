const { normalizeURL } = require("./crawl.js");
const { test, expect } = require("@jest/globals");
const { getURLsFromHTML } = require("./crawl.js");

test("normalizeURL strip protocol", () => {
  const input = "https://www.example.com/path";
  const actual = normalizeURL(input);
  const expected = "www.example.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://www.example.com/path/";
  const actual = normalizeURL(input);
  const expected = "www.example.com/path";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute urls", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="https://www.example.com/path">
                example
            </a>
        </body>
    </html>
    `;
  const inputBaseUrl = "https://www.example.com/path";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = ["https://www.example.com/path"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative ", () => {
  const inputHTMLBody = `
      <html>
          <body>
              <a href="/path/">
                  example
              </a>
          </body>
      </html>
      `;
  const inputBaseUrl = "https://www.example.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = ["https://www.example.com/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML multiple ", () => {
  const inputHTMLBody = `
      <html>
          <body>
              <a href="/path1/">
                  example path 1
              </a>
               <a href="https://www.example.com/path2/">
                  example path 2

              </a>
          </body>
      </html>
      `;
  const inputBaseUrl = "https://www.example.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = [
    "https://www.example.com/path1/",
    "https://www.example.com/path2/",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid ", () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="invalid">
                    invalid
                </a>
            </body>
        </html>
        `;
    const inputBaseUrl = "https://www.example.com";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
    const expected = [];
    expect(actual).toEqual(expected);
  });