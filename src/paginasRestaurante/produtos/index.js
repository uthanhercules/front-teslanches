/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-use-before-define */
import './styles.css';
import '../../styles/global.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import illustrationTop from '../../assets/illustration-top.svg';
import CustomizedDialogs from '../../componentes/customDialog';
import ProdutosNovo from '../produtosNovo';
import UsuarioEditar from '../usuarioEditar/index';
import CustomCard from '../../componentes/customCard';
import useAuth from '../../hooks/useAuth';
import { get, del } from '../../services/apiClient';
import ProdutosEditar from '../produtosEditar';

import Diversos from '../../assets/bg-Diversos.png';
import Pizzaria from '../../assets/bg-pizzaria.png';
import Massas from '../../assets/bg-Massas.png';
import Arabe from '../../assets/bg-Arabe.png';
import Carnes from '../../assets/bg-Carnes.png';
import Chinesa from '../../assets/bg-Chinesa.png';
import Italiana from '../../assets/bg-Italiana.png';
import Japonesa from '../../assets/bg-Japonesa.png';
import Mexicano from '../../assets/bg-Mexicano.png';
import Brasileira from '../../assets/bg-Brasileira.png';
import Lanches from '../../assets/bg-Lanches.png';

export default function produtos() {
  const { user, token, deslogar } = useAuth();
  const [prod, setProd] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const customId = 'custom-id-yes';

  useEffect(() => {
    async function buscarProdutos() {
      try {
        const { dados, ok } = await get('/produtos', token);

        if (!ok) {
          toast.error(dados, { toastId: customId });
          return;
        }
        setProd(dados);
      } catch (error) {
        toast.error(error.message, { toastId: customId });
      }
    }

    const buscarUsuario = async () => {
      try {
        const { dados, ok } = await get('/usuario', token);

        if (!ok) {
          return toast.error(`erro${dados}`);
        }
        toast.error(dados);
        return setUsuario(dados);
      } catch (error) {
        toast.error(error.message);
      }
      return toast.error('Usuario');
    };
    buscarUsuario();
    buscarProdutos();
  }, []);

  async function removerProduto(id) {
    try {
      const dados = await del(`produtos/${id}`);

      setProd(dados);
    } catch (error) {
      toast.error(error.message, { toastId: customId });
    }
    toast('Produto removido com sucesso', { toastId: customId });
  }

  console.log(prod);
  console.log(user.Categoria);

  const categoriaStyle = () => {
    const categoria = user.Categoria;
    switch (categoria) {
      default:
        return { backgroundImage: `url(${Pizzaria})` };
      case 'Diversos':
        return { backgroundImage: `url(${Diversos})` };
      case 'Lanches':
        return { backgroundImage: `url(${Lanches})` };
      case 'Carnes':
        return { backgroundImage: `url(${Carnes})` };
      case 'Massas':
        return { backgroundImage: `url(${Massas})` };
      case 'Pizzas':
        return { backgroundImage: `url(${Pizzaria})` };
      case 'Japonesa':
        return { backgroundImage: `url(${Japonesa})` };
      case 'Chinesa':
        return { backgroundImage: `url(${Chinesa})` };
      case 'Mexicano':
        return { backgroundImage: `url(${Mexicano})` };
      case 'Brasileira':
        return { backgroundImage: `url(${Brasileira})` };
      case 'Italiana':
        return { backgroundImage: `url(${Italiana})` };
      case 'Árabe':
        return { backgroundImage: `url(${Arabe})` };
    }
  };
  return (
    <div className="bodyProdutos">
      <div style={categoriaStyle()} className="conteinerTopo contentCenter itemsCenter">
        <div className="flexRow contentBetween itemsCenter">
          <h1 className="nomeRestaurante">{ user.NomeRestaurante }</h1>
          <button className="btLogout logout" type="button" onClick={deslogar}>Logout</button>
        </div>
      </div>
      <img className="vetorProdutos" src={illustrationTop} alt="vetor" />

      <img src={usuario.imagem_restaurante} alt="avatarRestaurante" className="avatarRestaurante" />
      <div className="avatarRestaurante">
        <CustomizedDialogs
          conteudo={<UsuarioEditar />}
        />
      </div>

      <div className={`${prod.length === 0 ? 'none' : 'contemProdutos'} flexColunm contentCenter itemsCenter mt2rem`}>
        <div className="contemBotao flexRow itemsCenter">
          <CustomizedDialogs
            btAbrirMensagem={<> Adicionar produto ao cardápio</>}
            btMensagem={<>Adicionar produto novo</>}
            conteudo={<ProdutosNovo />}
          />
        </div>

        <div className="conteinerCardapio flexRow gap2rem">
          { prod.map((produto) => (

            <div className="flip-card" item key={produto.id}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <CustomCard
                    {...produto}
                    removerProduto={removerProduto}
                  />
                </div>
                <div className="flip-card-back">
                  <button className="btTransparente" type="button" onClick={removerProduto}>Excluir produto do catálogo</button>
                  {' '}
                  <CustomizedDialogs
                    btAbrirMensagem={<> Editar produto </>}
                    btMensagem={<>Atualizar produto </>}
                    conteudo={<ProdutosEditar {...produto} />}

                  />
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>

      <div className={`${prod.length === 0 ? 'addProdutos' : 'none'} flexColunm contentCenter itemsCenter`}>
        <span>
          Você ainda não tem nenhum produto no seu cardápio.
          <br />
          Gostaria de adicionar um novo produto?
        </span>
        <CustomizedDialogs
          btAbrirMensagem={<> Adicionar produto ao cardápio</>}
          btMensagem={<>Adicionar produto novo</>}
          conteudo={<ProdutosNovo />}
        />
      </div>
    </div>
  );
}
