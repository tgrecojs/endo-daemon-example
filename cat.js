/* global window document */

import { E } from "@endo/far";
import { makeRefIterator } from "./ref-reader.js";

const dateFormatter = new window.Intl.DateTimeFormat(undefined, {
  dateStyle: "full",
  timeStyle: "long",
});

const followMessagesComponent = async (parentElement, powers) => {
  for await (const message of makeRefIterator(E(powers).followMessages())) {
    if (message.type === "request") {
      const { number, what, when, who, settled } = message;

      const $message = document.createElement("div");
      parentElement.appendChild($message);

      const $number = document.createElement("span");
      $number.innerText = `${number}. `;
      $message.appendChild($number);

      const $who = document.createElement("b");
      $who.innerText = `${who}:`;
      $message.appendChild($who);

      const $what = document.createElement("span");
      $what.innerText = ` ${what} `;
      $message.appendChild($what);

      const $when = document.createElement("i");
      $when.innerText = dateFormatter.format(Date.parse(when));
      $message.appendChild($when);

      const $input = document.createElement("span");
      $message.appendChild($input);

      const $pet = document.createElement("input");
      $input.appendChild($pet);

      const $resolve = document.createElement("button");
      $resolve.innerText = "resolve";
      $resolve.onclick = () => {
        E(powers).resolve(number, $pet.value).catch(window.reportError);
      };
      $input.appendChild($resolve);

      const $reject = document.createElement("button");
      $reject.innerText = "reject";
      $reject.onclick = () => {
        E(powers).reject(number, $pet.value).catch(window.reportError);
      };
      $input.appendChild($reject);

      settled.then(() => {
        $input.innerText = " settled ";
      });
    }
  }
};

export const endow = async (powers) => {
  document.body.innerHTML = "<h1>🐈‍⬛ Familiar Chat</h1>";
  followMessagesComponent(document.body, powers).catch(window.reportError);
};
