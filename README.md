<!--
title: Adding LinkedIn to your app using open source analytics
description: Connect LinkedIn to the analytics library
pageTitle: LinkedIn
-->

# LinkedIn

This library exports the `linkedin` plugin for the [`analytics`](https://www.npmjs.com/package/analytics) package & standalone methods for any project to use to make it easier to interact with [LinkedIn](https://www.linkedin.com/).

This analytics plugin will load LinkedIn into your application.

## Installation

```bash
npm install analytics
npm install analytics-plugin-linkedin
```

## How to use

```typescript
import Analytics from "analytics";
import linkedin from "analytics-plugin-linkedin";

const analytics = Analytics({
  app: "awesome-app",
  plugins: [
    linkedin({
      accountId: "1234", // required
    }),
  ],
});
```
