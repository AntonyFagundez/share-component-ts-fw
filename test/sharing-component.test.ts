import { html, fixture, expect } from '@open-wc/testing';

import { SharingComponent } from '../src/SharingComponent.js';
import '../sharing-component.js';

describe('SharingComponent', () => {
  it('Properties all selected', async () => {
    const title = "prueba";
    const el = await fixture<SharingComponent>(html`<sharing-component title="${title}"></sharing-component>`);

    expect(el.title).to.equal(title);
  });

  // it('increases the counter on button click', async () => {
  //   const el = await fixture<SharingComponent>(html`<sharing-component></sharing-component>`);
  //   el.shadowRoot!.querySelector('button')!.click();

  //   // expect(el.counter).to.equal(6);
  // });

  // it('can override the title via attribute', async () => {
  //   const el = await fixture<SharingComponent>(html`<sharing-component title="attribute title"></sharing-component>`);

  //   expect(el.title).to.equal('attribute title');
  // });

  it('passes the a11y audit', async () => {
    const el = await fixture<SharingComponent>(html`<sharing-component></sharing-component>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
