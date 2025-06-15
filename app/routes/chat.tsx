import { ChatManager } from '~/components/ChatManager';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function ChatRoute() {
  const { bearerToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!bearerToken) {
      navigate('/sso-login');
    }
  }, [bearerToken, navigate]);

  return <ChatManager />;
} 