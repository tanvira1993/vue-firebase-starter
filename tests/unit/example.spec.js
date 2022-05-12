import { mount } from "@vue/test-utils";
import HelloWorld from "@/components/to-do.vue";
const puppeteer = require("puppeteer");

//basic test to check it is a vue instance
describe("to-do.vue", () => {
  it("check vue apps", () => {
    const wrapper = mount(HelloWorld, {});
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

// end 2 end test for saveBoard()
test("checking e2e for saveBoard", async (done) => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ["--window-size=1920,1080"],
  });
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:8146/");
  await page.click("#name");
  await page.type("#name", "name");
  await page.click("#title");
  await page.type("#title", "Article 1");
  await page.click("#body");
  await page.type("#body", "Body test");
  await page.click("#button");
  await browser.close();
  done();
}, 40000);
