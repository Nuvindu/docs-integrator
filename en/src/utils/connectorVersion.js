import { useState, useEffect, useCallback } from 'react';

const STORAGE_PREFIX = 'connector_version_';

function getStorageKey(connectorName) {
  return `${STORAGE_PREFIX}${connectorName}`;
}

export function getConnectorVersion(connectorName, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = localStorage.getItem(getStorageKey(connectorName));
    return stored || fallback;
  } catch {
    return fallback;
  }
}

export function setConnectorVersion(connectorName, version) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(connectorName), version);
  } catch {
    // localStorage unavailable
  }
}

export function useConnectorVersion(connectorName, availableVersions, defaultVersion) {
  const [version, setVersionState] = useState(() => {
    const stored = getConnectorVersion(connectorName, defaultVersion);
    return availableVersions.includes(stored) ? stored : defaultVersion;
  });

  useEffect(() => {
    const stored = getConnectorVersion(connectorName, defaultVersion);
    const resolved = availableVersions.includes(stored) ? stored : defaultVersion;
    if (resolved !== version) {
      setVersionState(resolved);
    }
  }, [connectorName, availableVersions, defaultVersion]);

  const setVersion = useCallback(
    (newVersion) => {
      setConnectorVersion(connectorName, newVersion);
      setVersionState(newVersion);
    },
    [connectorName],
  );

  return [version, setVersion];
}
