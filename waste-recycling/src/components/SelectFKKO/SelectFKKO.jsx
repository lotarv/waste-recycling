import fetchFkkos from "../../api/FkkoApi";

function SelectFKKO({onChange}) {
    return (
        <Select
            options={fkkoOptions}
            onChange={(selectedOption) =>
                handleFkkoChange(selectedOption, index, "waste_to_recycle")
            }
            placeholder="Выберите код ФККО"
            isSearchable
        />
    )
}

export default SelectFKKO;