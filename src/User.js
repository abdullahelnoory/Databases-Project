import "./User.css";


export default function User({
  tabIndex,
  title,
  role,
  id,
  classname,
  onclick,
}) {
  return (
    <button
      onClick={onclick}
      role="checkbox"
      aria-checked="false"
      tabIndex={tabIndex}
      title={title}
      id={id}
      className={classname}
    >
      {role}
    </button>
  );
}

