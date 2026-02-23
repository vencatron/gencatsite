interface AdminPageHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
}

const AdminPageHeader = ({ title, description, action }: AdminPageHeaderProps) => {
  return (
    <div className="mb-8 flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">{title}</h1>
        {description && <p className="text-neutral-600">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

export default AdminPageHeader