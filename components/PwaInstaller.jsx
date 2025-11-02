"use client";

import { useEffect, useState } from "react";

export default function PwaInstaller({ enabled }) {
  const [promptEvent, setPromptEvent] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    function handleBeforeInstallPrompt(event) {
      event.preventDefault();
      setPromptEvent(event);
      setVisible(true);
    }
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, [enabled]);

  if (!enabled || !visible || !promptEvent) return null;

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-4 shadow-lg">
      <p className="text-sm font-medium text-neutral-900">
        Install Chalet Manager on your device for quick access.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-neutral-700"
          onClick={async () => {
            promptEvent.prompt();
            const { outcome } = await promptEvent.userChoice;
            if (outcome !== "accepted") {
              setVisible(false);
            }
          }}
        >
          Install
        </button>
        <button
          type="button"
          className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-600 hover:border-neutral-400"
          onClick={() => setVisible(false)}
        >
          Later
        </button>
      </div>
    </div>
  );
}
