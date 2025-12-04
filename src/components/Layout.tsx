import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  AttachMoney as MoneyIcon,
  Warning as WarningIcon,
  Settings as SettingsIcon,
  LocalPharmacy as PharmacyIcon,
  Computer as ComputerIcon,
  CheckCircle as CheckCircleIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import { AccessLevel } from '../types';

const drawerWidth = 280;

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  accessLevel: AccessLevel;
}

const menuItems = [
  // { id: 'safety-lek', label: 'S Безопасность (Лек)', icon: <PharmacyIcon />, color: '#f44336' },
  { id: 'safety-info', label: 'S Безопасность', icon: <ComputerIcon />, color: '#f44336' },
  // { id: 'quality-tfoms', label: 'Q Качество (Пар МО)(ТФОМС)', icon: <CheckCircleIcon />, color: '#2196f3' },
  { id: 'quality-i9', label: 'Q Качество', icon: <CheckCircleIcon />, color: '#2196f3' },
  // { id: 'quality-eck', label: 'Q Качество (ЕЦК)', icon: <CheckCircleIcon />, color: '#2196f3' },
  { id: 'execution', label: 'D Исполнение', icon: <AssessmentIcon />, color: '#4caf50' },
  { id: 'costs', label: 'С Затраты', icon: <MoneyIcon />, color: '#ffc107' },
  { id: 'corpculture', label: 'М КорпКультура', icon: <BusinessIcon />, color: '#9c27b0' },
  // { id: 'dashboard', label: 'Дашборд', icon: <DashboardIcon />, color: '#1976d2' },
  // { id: 'kpi', label: 'KPI', icon: <AssessmentIcon />, color: '#1976d2' },
  // { id: 'incidents', label: 'Инциденты', icon: <WarningIcon />, color: '#1976d2' },
  { id: 'settings', label: 'Настройки', icon: <SettingsIcon />, color: '#1976d2' },
];

export const Layout: React.FC<LayoutProps> = ({
  children,
  currentPage,
  onPageChange,
  accessLevel,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ fontSize: '1rem' }}>
          Информационный центр
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={currentPage === item.id}
              onClick={() => {
                onPageChange(item.id);
                setMobileOpen(false);
              }}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: `${item.color}15`,
                  borderLeft: `3px solid ${item.color}`,
                  '&:hover': {
                    backgroundColor: `${item.color}25`,
                  },
                },
                '&:hover': {
                  backgroundColor: `${item.color}10`,
                },
              }}
            >
              <ListItemIcon sx={{ color: currentPage === item.id ? item.color : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: currentPage === item.id ? 600 : 400,
                  color: currentPage === item.id ? item.color : 'inherit',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Уровень доступа: {accessLevel}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Показатели эффективности
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

