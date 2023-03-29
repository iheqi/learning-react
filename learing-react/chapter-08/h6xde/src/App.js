import React from "react";
import { UserRepositories } from "./UserRepositories";
import { Fetch } from "./Fetch";
import SiteLayout from "./components/SiteLayout";
import ErrorBoundary from "./components/ErrorBoundary";

function UserDetails({ data }) {
  return (
    <div className="githubUser">
      <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
      <div>
        <h1>{data.login}</h1>
        {data.name && <p>{data.name}</p>}
        {data.location && <p>{data.location}</p>}
      </div>
      <UserRepositories
        login={data.login}
        onSelect={repoName => console.log(`${repoName} selected`)}
      />
    </div>
  );
}
function GitHubUser({ login }) {
  return (
    <Fetch
      uri={`https://api.github.com/users/${login}`}
      renderSuccess={UserDetails}
    />
  );
}


function ErrorScreen({ error }) {
  return (
    <div className="error">
      <h3>We are sorry...</h3>
      <p>We cannot process your request at this moment.</p>
      <p>ERROR: {error.message}</p>
    </div>
  )
}

const BreakThings = () => {
  throw new Error("报错啦")
}

export default function App() {
  // return <GitHubUser login="moonhighway" />;
  return <SiteLayout menu={
    <ErrorBoundary fallback={ErrorScreen}>
      <p>Site Layout</p>
      <BreakThings></BreakThings>
    </ErrorBoundary>
  }>
    <>
      <h2>
        h2
      </h2>

      <h1>Contents</h1>
      <p>This is the main part of the example layout</p>
    </>
  </SiteLayout>
}
