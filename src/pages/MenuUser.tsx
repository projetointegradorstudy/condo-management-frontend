import { Sidebar } from '../components/Sidebar';
import { NavbarMobile } from '../components/NavbarMobile';
import { CardEnvironment } from '../components/CardEnvironment';
import { IEnvironment } from '../interfaces';
import { useEffect, useState } from 'react';
import { getEnvironments } from '../services/api';
import { Spinner } from '../components/Spinner';
import { WarningFeedback } from '../components/WarningFeedback';
import { Footer } from '../components/Footer';
import '../styles/menu-user.scss';
import { getContext } from '../utils/context-import';

export function MenuUser() {
  const [environments, setEnvironments] = useState<IEnvironment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isUser, isMyselfData, getUserData } = getContext();

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (isLoading && isUser)
      (async () => {
        await getEnvironments()
          .then((res) => {
            setIsLoading(false);
            setEnvironments(res.data);
          })
          .catch(() => {});
      })();
  }, [isLoading, isUser]);

  return (
    <div className="page-menu-user">
      <Sidebar />
      <NavbarMobile />
      <div className="container-menu-user">
        <div className="content-welcome-user">
          <h1>
            Seja bem-vindo(a),
            <br />
            <b>{isMyselfData?.name || isMyselfData?.email}</b>
          </h1>
        </div>
        <div className="content-title-user">
          <h2>Ambientes disponíveis</h2>
        </div>
        {environments?.length > 0 && !isLoading ? (
          <div className="content-menu-user">
            {environments &&
              environments.map((environment, index) => {
                return <CardEnvironment key={index++} data={environment} />;
              })}
          </div>
        ) : environments?.length === 0 && isLoading ? (
          <Spinner />
        ) : (
          <WarningFeedback title="Não há registros." />
        )}
      </div>
      <Footer isFull />
    </div>
  );
}
