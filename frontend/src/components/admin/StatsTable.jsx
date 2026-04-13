import '../../styles/adminStyles/StatsTable.css'

export default function StatsTable({ title, columns, rows }) {
  return (
    <section className="statsTableCard">
      <div className="statsTableCard__header">
        <h3>{title}</h3>
      </div>

      <div className="statsTableCard__tableWrap">
        <table className="statsTable">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key} style={{ textAlign: c.align || 'left', width: c.width }}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                {columns.map((c) => (
                  <td key={c.key} style={{ textAlign: c.align || 'left' }}>
                    {c.render ? c.render(r) : r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}