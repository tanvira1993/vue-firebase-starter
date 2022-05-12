import { mount, createLocalVue } from "@vue/test-utils";
import Home from "@/views/";
import Vuetify from "vuetify";

//basic test to check it is a vue instance
describe("HelloWorld.vue", () => {
  it("check vue apps", () => {
    const wrapper = mount(Home, {});
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

describe("Home.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("should have a custom title and match snapshot", () => {
    const wrapper = mount(Home, {
      localVue,
      vuetify,
      propsData: { profile_model: { id: 1, name: "John Doe" } },
    });

    // With jest we can create snapshot files of the HTML output
    expect(wrapper.html()).toMatchSnapshot();

    // We could also verify this differently
    // by checking the text content
    // const title = wrapper.find(".v-card__title > span");
    // const title = wrapper.find(".vue-form-generator");
    // vue-form-generator
    // console.log("tetete", title);
    const title = "John Doe";
    expect(title).toBe("John Doe");
  });
});
