import { useState } from "react";
import shortid from "shortid";
import s from "./Form.module.css";

const FormHooks = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const nameInputId = shortid.generate();
  const numInputId = shortid.generate();

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, number });
    reset();
  };

  const reset = () => {
    setName("");
    setNumber("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor={nameInputId}>
          <input
            className={s.formInput}
            placeholder="Name"
            id={nameInputId}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            onChange={handleChange}
          />
        </label>

        <label htmlFor={numInputId}>
          <input
            className={s.formInput}
            placeholder="Tel"
            id={numInputId}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            onChange={handleChange}
          />
        </label>
        <button className={s.formBtn} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};
export default FormHooks;

// export default class Form extends Component {
//   state = {
//     name: "",
//     number: "",
//   };
//   nameInputId = shortid.generate();
//   numInputId = shortid.generate();

//   handleChange = (e) => {
//     const { name, value } = e.currentTarget;
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.props.onSubmit(this.state);
//     this.reset();
//   };
//   reset = () => {
//     this.setState({
//       name: "",
//       number: "",
//     });
//   };

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <label htmlFor={this.nameInputId}>
//             <input
//               className={s.formInput}
//               placeholder="Name"
//               id={this.nameInputId}
//               type="text"
//               name="name"
//               value={this.state.name}
//               pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//               title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
//               required
//               onChange={this.handleChange}
//             />
//           </label>

//           <label htmlFor={this.numInputId}>
//             <input
//               className={s.formInput}
//               placeholder="Tel"
//               id={this.numInputId}
//               type="tel"
//               name="number"
//               value={this.state.number}
//               pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//               title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
//               required
//               onChange={this.handleChange}
//             />
//           </label>
//           <button className={s.formBtn} type="submit">
//             Add contact
//           </button>
//         </form>
//       </div>
//     );
//   }
// }
