import Image from "next/image";
import { useState } from "react";
import ImageCheckBox from "../public/assets/question-icon.svg"

const Checkbox = () => {
	const [isChecked, setIsChecked] = useState(false);

	const handleCheckbox = () => {
		setIsChecked((preValue) => !preValue);
	};
	return (
		<div className="loan-extension-checkbox">
			<div
				className={isChecked ? "checkbox checked" : "checkbox"}
				onClick={handleCheckbox}
			></div>
			<span>Extended Loan</span>
			<a className="question-mark-icon w-[18px] h-[18px] relative">
				<Image src={ImageCheckBox} layout="fill" alt="question-icon"></Image>
				<div className="question-hover">Some text here</div>
			</a>
		</div>
	);
};

export default Checkbox;
