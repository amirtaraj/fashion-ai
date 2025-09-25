import React, { useEffect, useState } from 'react'
import { fetchInventoryAnalysis } from '../config/analysisApi';
import { mockAlertData } from '../data/alertMockData';
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'

export default function ActivityAlerts() {
  const [alerts, setAlerts] = useState({ low: [], defective: [], overstock: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventoryAnalysis({ low: 5, high: 500 })
      .then(data => {
        setAlerts({
          low: Array.isArray(data?.low_stock_items) ? data.low_stock_items : mockAlertData.low_stock_items,
          defective: Array.isArray(data?.defective_items) ? data.defective_items : mockAlertData.defective_items,
          overstock: Array.isArray(data?.high_stock_items) ? data.high_stock_items : mockAlertData.high_stock_items
        });
      })
      .catch(() => {
        setAlerts({
          low: mockAlertData.low_stock_items,
          defective: mockAlertData.defective_items,
          overstock: mockAlertData.high_stock_items
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Active Alerts</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {alerts.low.map(item => (
            <Chip
              key={item.id}
              label={`Low stock: ${item.name}`}
              color="error"
            />
          ))}
          {alerts.defective.map(item => (
            <Chip
              key={item.id}
              label={`Defective: ${item.name}`}
              color="warning"
            />
          ))}
          {alerts.overstock.map(item => (
            <Chip
              key={item.id}
              label={`Overstock: ${item.name}`}
              color="info"
            />
          ))}
        </Box>
        {alerts.low.length === 0 && alerts.defective.length === 0 && alerts.overstock.length === 0 && (
          <Typography>No active alerts.</Typography>
        )}
      </Box>
    </Paper>
  )
}
