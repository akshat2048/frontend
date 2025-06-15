import { Link } from "react-router";
import { Button } from '@mantine/core';

export function Welcome() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to Agentic Recruiter</h1>
        <div className="flex flex-col gap-4">
          <Button
            component={Link}
            to="/sso-login"
            variant="outline"
            color="gray"
            size="lg"
            style={{ backgroundColor: 'white' }}
          >
            SSO Login
          </Button>
          <Button
            component={Link}
            to="/chat"
            size="lg"
            variant="filled"
            color="blue"
          >
            Take me to chat
          </Button>
        </div>
      </div>
    </main>
  );
}
