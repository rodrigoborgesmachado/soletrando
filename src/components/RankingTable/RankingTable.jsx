import './RankingTable.css';

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function buildGroups(data) {
  const groups = new Map();

  data.forEach((item) => {
    const nivel = toNumber(item.nivel);
    const quantidadeQuestoes = toNumber(item.quantidadeQuestoes);
    const key = `${nivel}-${quantidadeQuestoes}`;

    if (!groups.has(key)) {
      groups.set(key, {
        nivel,
        quantidadeQuestoes,
        entries: [],
      });
    }

    groups.get(key).entries.push({
      nome: item.nome || '-',
      numeroAcertos: toNumber(item.numeroAcertos),
    });
  });

  return Array.from(groups.values())
    .map((group) => ({
      ...group,
      entries: group.entries.sort((a, b) => {
        if (b.numeroAcertos !== a.numeroAcertos) {
          return b.numeroAcertos - a.numeroAcertos;
        }
        return a.nome.localeCompare(b.nome, 'pt-BR');
      }),
    }))
    .sort((a, b) => {
      if (a.nivel !== b.nivel) {
        return a.nivel - b.nivel;
      }
      return a.quantidadeQuestoes - b.quantidadeQuestoes;
    });
}

function RankingTable({ data }) {
  if (!data || data.length === 0) {
    return <p className="ranking-empty">Ainda não há pontuações registradas.</p>;
  }

  const groups = buildGroups(data);

  return (
    <div className="ranking-groups">
      {groups.map((group) => (
        <section
          key={`${group.nivel}-${group.quantidadeQuestoes}`}
          className="ranking-group"
          aria-label={`Ranking nível ${group.nivel} com ${group.quantidadeQuestoes} questões`}
        >
          <h2 className="ranking-group-title">
            Nível {group.nivel} - {group.quantidadeQuestoes} questões
          </h2>

          <div className="ranking-table-wrap">
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>Posição</th>
                  <th>Nome</th>
                  <th>Acertos</th>
                </tr>
              </thead>
              <tbody>
                {group.entries.map((item, index) => (
                  <tr key={`${item.nome}-${group.nivel}-${group.quantidadeQuestoes}-${index}`}>
                    <td>{index + 1}</td>
                    <td>{item.nome}</td>
                    <td>{item.numeroAcertos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}

export default RankingTable;
