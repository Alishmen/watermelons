import { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { Layout } from './components/Layout';
// import { Dashboard } from './components/Dashboard';
// import { KPIPage } from './pages/KPIPage';
// import { SafetyLekPage } from './pages/SafetyLekPage';
import { SafetyInfoPage } from './pages/SafetyInfoPage';
// import { QualityTFOMSPage } from './pages/QualityTFOMSPage';
import { QualityI9Page } from './pages/QualityI9Page';
// import { QualityECKPage } from './pages/QualityECKPage';
import { ExecutionPage } from './pages/ExecutionPage';
import { EconomicsPage } from './pages/EconomicsPage';
import { CorpCulturePage } from './pages/CorpCulturePage';
// import { IncidentsPage } from './pages/IncidentsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AccessLevel } from './types';

function App() {
  // В реальном приложении это будет из контекста/состояния пользователя
  const [accessLevel] = useState<AccessLevel>('I');
  const [userDepartment] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState('safety-info');

  const renderPage = () => {
    switch (currentPage) {
      // case 'dashboard':
      //   return <Dashboard accessLevel={accessLevel} userDepartment={userDepartment} />;
      // case 'kpi':
      //   return <KPIPage accessLevel={accessLevel} userDepartment={userDepartment} />;
      // case 'safety-lek':
      //   return <SafetyLekPage />;
      case 'safety-info':
        return <SafetyInfoPage />;
      // case 'quality-tfoms':
      //   return <QualityTFOMSPage />;
      case 'quality-i9':
        return <QualityI9Page />;
      // case 'quality-eck':
      //   return <QualityECKPage />;
      case 'execution':
        return <ExecutionPage accessLevel={accessLevel} userDepartment={userDepartment} />;
      case 'costs':
        return accessLevel === 'I' ? <EconomicsPage /> : (
          <div>Доступ ограничен. Требуется уровень доступа I.</div>
        );
      case 'corpculture':
        return <CorpCulturePage />;
      // case 'incidents':
      //   return <IncidentsPage />;
      case 'settings':
        return <SettingsPage accessLevel={accessLevel} userDepartment={userDepartment} />;
      default:
        return <SafetyInfoPage />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        accessLevel={accessLevel}
      >
        {renderPage()}
      </Layout>
    </ThemeProvider>
  );
}

export default App;
