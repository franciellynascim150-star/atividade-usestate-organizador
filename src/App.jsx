import { useState } from "react";
import "./App.css";

function App() {
  const [texto, setTexto] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [filtro, setFiltro] = useState("todas");

  function adicionarTarefa(evento) {
    evento.preventDefault();

    const textoLimpo = texto.trim();

    if (textoLimpo === "") {
      return;
    }

    const novaTarefa = {
      id: Date.now(),
      texto: textoLimpo,
      concluida: false
    };

    setTarefas((anteriores) => [...anteriores, novaTarefa]);
    setTexto("");
  }

  function alternarConclusao(id) {
    setTarefas((anteriores) =>
      anteriores.map((tarefa) => {
        if (tarefa.id === id) {
          return {
            ...tarefa,
            concluida: !tarefa.concluida
          };
        }

        return tarefa;
      })
    );
  }

  function removerTarefa(id) {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) => tarefa.id !== id)
    );
  }

  function limparConcluidas() {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) => !tarefa.concluida)
    );
  }

  const total = tarefas.length;

  const concluidas = tarefas.filter(
    (tarefa) => tarefa.concluida
  ).length;

  const pendentes = total - concluidas;

  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (filtro === "pendentes") {
      return !tarefa.concluida;
    }

    if (filtro === "concluidas") {
      return tarefa.concluida;
    }

    return true;
  });

  return (
    <main className="pagina">
      <section className="organizador">
        <h1>Minhas tarefas</h1>

        <p className="descricao">
          Um lugar simples para organizar minhas atividades.
        </p>

        <form onSubmit={adicionarTarefa} className="formulario">
          <label htmlFor="nova-tarefa">O que preciso fazer?</label>

          <div className="campo">
            <input
              id="nova-tarefa"
              type="text"
              placeholder="Digite uma tarefa..."
              value={texto}
              onChange={(evento) => setTexto(evento.target.value)}
            />

            <button type="submit" className="botao-adicionar">
              Adicionar
            </button>
          </div>
        </form>

        <section className="resumo">
          <div className="resumo-item">
            <span>Total</span>
            <strong>{total}</strong>
          </div>

          <div className="resumo-item">
            <span>Concluídas</span>
            <strong>{concluidas}</strong>
          </div>

          <div className="resumo-item">
            <span>Pendentes</span>
            <strong>{pendentes}</strong>
          </div>
        </section>

        <div className="filtros">
          <button
            type="button"
            className={filtro === "todas" ? "ativo" : ""}
            onClick={() => setFiltro("todas")}
          >
            Todas
          </button>

          <button
            type="button"
            className={filtro === "pendentes" ? "ativo" : ""}
            onClick={() => setFiltro("pendentes")}
          >
            Pendentes
          </button>

          <button
            type="button"
            className={filtro === "concluidas" ? "ativo" : ""}
            onClick={() => setFiltro("concluidas")}
          >
            Concluídas
          </button>
        </div>

        <ul className="lista">
          {tarefasVisiveis.length === 0 && (
            <li className="vazia">
              Nenhuma tarefa por aqui.
            </li>
          )}

          {tarefasVisiveis.map((tarefa) => (
            <li key={tarefa.id} className="tarefa">
              <label className="texto-tarefa">
                <input
                  type="checkbox"
                  checked={tarefa.concluida}
                  onChange={() => alternarConclusao(tarefa.id)}
                />

                <span className={tarefa.concluida ? "concluida" : ""}>
                  {tarefa.texto}
                </span>
              </label>

              <button
                type="button"
                className="botao-remover"
                onClick={() => removerTarefa(tarefa.id)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="botao-limpar"
          onClick={limparConcluidas}
        >
          Limpar concluídas
        </button>
      </section>

      <p className="rodape">
        Organizando um dia de cada vez ♡
      </p>
    </main>
  );
}

export default App;
