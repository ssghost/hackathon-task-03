# hackathon-task-03

This is a React based Webapp and was written in Typescript. The main feature is to initialize and interact with a CCD smart contract 
"MyStorage" which was generated from my last hackathon task repo "hackathon-task-02". The contract ensures users to store an integer
number on the chain and view the current stored number at any time. Every one can store the number after 0.1 CCD paid to the contract 
owner and view the storage is free. 

When you deployed the webapp and browsed the index page you can see the value stored (initially "0") on top of the page, with a button
labelled as "Refresh" to refresh and retrieve the latest stored value as time passes by. Underneath is an input form to let you input 
a new value to update into the storage, and a check-box to let you decide whether it should be stored or not, and a button with label 
"Update" to execute the update process.

## Usage
`yarn run my-app/src/index.tsx`
