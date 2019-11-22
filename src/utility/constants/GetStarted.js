import Routes from "./Routes";
const imgPath = (directory = "BrowsingTheMarketplace", file = "CardorListViews", extension = "png") =>
  `${process.env.REACT_APP_SNET_CDN}/assets/images/GetStarted/${directory}/${file}.${extension}`;

export const GetStartedCategoriesData = [
  {
    title: "Overview",
    media: imgPath("Overview"),
    content: [
      {
        type: "description",
        value: `<p>The Request for AI (RFAI) portal fosters the community by enabling users to incentivize developers to publish services to the AI Marketplace.  Users can create request and back (or fund) requests with AGI tokens to increase the reward incentive for getting a service developed.  After developers submit a solution for request, there is a vote by the backers for the most valid solutions in which AGI tokens are transferred to the developers based on the vote distribution.</p>`,
      },
      {
        type: "listHeading",
        value: `<span>To Participate you will need to:</span>`,
      },
      {
        type: "list",
        items: [
          `<p><a href="/${Routes.LOGIN}">Login </a>or <a href="/${Routes.SIGNUP}">Signup</a> for your AI Marketplace account</p>`,
          `<p>Use your <a href="/">Metamask </a>wallet to user your AGI tokens</p>`,
        ],
      },
    ],
  },
  {
    title: "Making A Request",
    media: imgPath("MakingaRequest"),
    content: [
      {
        type: "description",
        value: `<p>When you are logged into your <a href="/">SingularityNET account</a> and <a href="/">Metamask </a>, you can begin the request process.  You will need provide some general information such as request title, detailed descriptions, and define the acceptance criteria.   As the request creator, you will be the first user to “back” (or fund) the request with AGI tokens.  Your tokens along with other backers will be distributed to developers with the valid and most voted solutions.  If no developers submit solutions for your request, then your AGI tokens will be avaliable for you to “Reclaim” (or be refunded) back to you.</p>`,
      },
      {
        type: "listHeading",
        value: `<span>The SingularityNET foundation will review all requests. In general we look for</span>`,
      },
      {
        type: "list",
        items: [
          `<p>Clear problem description</p>`,
          `<p>Relevant problem which if solved will help the community</p>`,
          `<p>Quantitative evaluation criteria</p>`,
        ],
      },
      {
        type: "action",
        value: {
          type: "blue",
          btnText: "create a new request",
        },
      },
    ],
  },
  {
    title: "Backing A Request",
    media: imgPath("BackingaRequest"),
    content: [
      {
        type: "description",
        value: `<p>There are two ways to “back” or fund a request.  You can create a request and be the first “backer” for that request.  Or you can “back” any of the avaliable requests on the <a href="/">View Requests </a>page. </p><p>After you have backed one or multiple requests, you will be given the ability to vote on any submitted solution during the Solution Vote period.  Only “backers” of a request can vote.   Your vote will determine who will get your share of the AGI tokens that you funded.  If you vote for one solution, then the developer for that solution will get your alloted backed AGI tokens.  If you vote for more than one solution for single request, then your alloted backed AGI tokens will be split amongst solutions you voted for evenly. </p><p>The higher the pool of AGI tokens for a request, the more likely developer will submit solutions.  Remember to vote!.</p>`,
      },
    ],
  },
  {
    title: "Request Review Process",
    media: imgPath("RequestreviewProgress"),
    content: [
      {
        type: "description",
        value: `<p>All request created by users will be reviewed by The SingularityNET foundation.  After your request is created, it will be located in the “Pending” tab on the <a href="/">View Request </a>page until it has been approved.   After it is approved it will be moved to the “Active” tab where it will be public to all users.   Reviews could take a few hours or a few days.</p>`,
      },
      {
        type: "listHeading",
        value: `<span>In general we look for</span>`,
      },
      {
        type: "list",
        items: [
          `<p>Clear problem description</p>`,
          `<p>Relevant problem which if solved will help the community</p>`,
          `<p>Quantitative evaluation criteria</p>`,
        ],
      },
    ],
  },
  {
    title: "Submitting A Solution",
    media: imgPath("SubmittingaSolution"),
    content: [
      {
        type: "description",
        value: `<p>All request created by users will be reviewed by The SingularityNET foundation.  After your request is created, it will be located in the “Pending” tab on the <a href="/">View Request </a>page until it has been approved.   After it is approved it will be moved to the “Active” tab where it will be public to all users.   Reviews could take a few hours or a few days.</p>`,
      },
      {
        type: "list",
        items: [
          `<p>Acceptance criteria in the request must be met</p>`,
          `<p>Performance metrics specified against provided test datasets should be met</p>`,
          `<p>Solution must be published and reviewed on the AI Marketplace platform</p>`,
          `<p>Provide the github repo of your code</p>`,
          `<p>Use same Metamask address to submit as you used to publish the service. </p>`,
        ],
      },
      {
        type: "subheading",
        value: `<p>Coming soon… SingularityNET Publisher allows you to publish your AI services.  This will be released early 2020.</p>`,
      },
      {
        type: "action",
        value: {
          type: "transparentBlueBorder",
          btnText: "learn more about publisher",
        },
      },
    ],
  },
  {
    title: "Solution Voting",
    media: imgPath("SolutionVoting"),
    content: [
      {
        type: "description",
        value: `<p>Every Backer for a request will be granted the opportunity to vote for on any of the avalible solutions.  A Backer’s vote will determine where their AGI tokens will be distributed to.  If they vote for more than one solution, their AGI tokens will be divided among the solutions they voted for.</p><p> There is a limited time period that Backers can vote.  This time limit will be specified by each request.   If the Backer does not participate in the voting process, the SingularityNET foundation vote will be considered and the reward AGI tokens will be distributed accordingly.</p>`,
      },
    ],
  },
  {
    title: "Claiming Tokens",
    media: imgPath("ClamingTokens"),
    content: [
      {
        type: "description",
        value: `<p>If you are AI developer, you can use the <a href="/">Claims page </a>to claim any AGI tokens that your solution has been awarded.</p><p> If you are Backer of a request that has expired, closed by the requestor, or failed to have any solutions submitted by AI developers, then you will be able to “reclaim” your AGI tokens back using the <a href="/">Claims page.</a></p><p><span>**Important Note**<span>AGI tokens can not be automatically transferred or refunded to your Metamask wallet currently with the platform.  You must go the <a href="/">Claims page </a>to claim all your AGI tokens to your specified Metamask wallet.</p>`,
      },
    ],
  },
  {
    title: "Closing A Request",
    media: imgPath("ClosingaRequest"),
    content: [
      {
        type: "description",
        value: `<p>Requests can only be closed either by SingularityNET foundation or the request creator.  If a request is closed before completion, all the Backers will be able to reclaim their AGI tokens through the <a href="/">Claims page.<a></p>`,
      },
    ],
  },
];
