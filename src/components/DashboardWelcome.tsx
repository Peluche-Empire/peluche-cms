'use client'

const DashboardWelcome = () => {
  return (
    <div
      style={{
        padding: '2rem',
        marginBottom: '1.5rem',
        borderRadius: '8px',
        background: 'var(--theme-elevation-50)',
        border: '1px solid var(--theme-elevation-150)',
      }}
    >
      <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>
        Peluche Empire CMS
      </h2>
      <p style={{ margin: 0, color: 'var(--theme-elevation-600)' }}>
        Select a tenant from the dropdown above to get started.
      </p>
    </div>
  )
}

export default DashboardWelcome
