import { Sidebar } from '../components/Sidebar';
import { NavbarMobile } from '../components/NavbarMobile';
import { CardEnvironment } from '../components/CardEnvironment';
import '../styles/menu-user.scss';
import { IEnvironment } from '../interfaces';
import { useContext, useEffect, useState } from 'react';
import { getEnvironments } from '../services/api';
import { GlobalContext } from '../contexts/GlobalContext';

export function MenuUser() {
  const [environments, setEnvironments] = useState<IEnvironment[]>();
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(GlobalContext);

  if (!context) return null;

  const { isUser } = context;

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
            <b>UserName</b>
          </h1>
        </div>
        <div className="content-title-user">
          <h2>Ambientes disponíveis</h2>
        </div>
        <div className="content-menu-user">
          <div className="content-cards-menu-user">
            {environments &&
              environments.map((environment, index) => {
                return <CardEnvironment key={index++} data={environment} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
