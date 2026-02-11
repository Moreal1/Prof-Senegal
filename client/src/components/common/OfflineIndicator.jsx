import React from 'react';
import { Snackbar, Alert, Badge, IconButton, Tooltip } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import WifiIcon from '@mui/icons-material/Wifi';
import useOfflineSync from '../../hooks/useOfflineSync';

const OfflineIndicator = () => {
  const { online, syncing, pendingCount, syncPendingActions } = useOfflineSync();

  return (
    <>
      {/* Barre de statut */}
      <div style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999,
        display: 'flex',
        gap: 8,
        alignItems: 'center',
      }}>
        {/* Icône connexion */}
        <Tooltip title={online ? 'En ligne' : 'Hors ligne'}>
          <IconButton
            size="small"
            sx={{
              bgcolor: online ? '#4caf50' : '#f44336',
              color: 'white',
              '&:hover': { bgcolor: online ? '#388e3c' : '#d32f2f' },
            }}
          >
            {online ? <WifiIcon /> : <WifiOffIcon />}
          </IconButton>
        </Tooltip>

        {/* Bouton sync */}
        {pendingCount > 0 && online && (
          <Tooltip title={`${pendingCount} action(s) à synchroniser`}>
            <Badge badgeContent={pendingCount} color="warning">
              <IconButton
                size="small"
                onClick={syncPendingActions}
                disabled={syncing}
                sx={{ bgcolor: '#ff9800', color: 'white' }}
              >
                <SyncIcon sx={{ animation: syncing ? 'spin 1s linear infinite' : 'none' }} />
              </IconButton>
            </Badge>
          </Tooltip>
        )}
      </div>

      {/* Notification hors ligne */}
      <Snackbar open={!online} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="warning" variant="filled">
          Vous êtes hors ligne. Les modifications seront synchronisées automatiquement.
        </Alert>
      </Snackbar>
    </>
  );
};

export default OfflineIndicator;