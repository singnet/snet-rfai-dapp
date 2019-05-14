# Request for RFAI Portal

This DApp is for RFAI Portal where users are request for a AI Service. This project also includes necessary contracts and the DApp is built using Drizzle Framework with ReactJS. 

## Installation

1. Clone the code from Github @ https://github.com/singnet/snet-rfai-dapp. Install the dependencies by running npm install Command. 

    ```javascript
    git clone https://github.com/singnet/snet-rfai-dapp
    cd snet-rfai-dapp
    npm install
    ```

2. Run the webpack server for front-end hot reloading (outside the development console). Smart contract changes must be manually recompiled and migrated. Make sure that the network & contract addresses are updated in the respective locations (build -> contracts)
    ```javascript
    // Serves the front-end on http://localhost:3000
    npm run start
    ```

3. Test is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.
    ```javascript
    // Run Jest outside of the development console for front-end component tests.
    npm run test
    ```

4. To build the application for production, use the build command. A production build will be in the build_webpack folder.
    ```javascript
    npm run build
    ```

5. To deploy the application for production, use the deploy command. A production build will be deployed basically copied to S3 bucket.
    ```javascript
    npm run deploy
    ```