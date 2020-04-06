import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const demoState = {
    expenses: [{
        id: 'nkadjlajlaa',
        description: 'January Rent',
        note: 'This was final payment for the address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
}


const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => {
    return {
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description,
            note,
            amount,
            createdAt
        }
    }
};

const removeExpense = ({ id } = {}) => {
    return {
        type: 'REMOVE_EXPENSE',
        id
    }
}

const editExpense = (id,updates) => {
    return {
        type:'EDIT_EXPENSE',
        id,
        updates
    }
}


const setTextFilter = (text = '') => {
    return {
        type:'SET_TEXT_FILTER',
        text
    }

}

const sortByAmount = () => ({
    type:'SORT_BY_AMOUNT',
    sortBy: 'amount'
});

const sortByDate = () => ({
    type:'SORT_BY_DATE',
    sortBy: 'date'
})

const setStartDate = (startDate) => ({
    type:'SET_START_DATE',
    startDate
});

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});
//Expense Reducer 

const expensesReducerDefaultState = [];

const expenseReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(expense => (expense.id !== action.id));
        case 'EDIT_EXPENSE':
            return state.map(expense => {
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else 
                    return expense;
            })
        default:
            return state;
    }
};

//Filters Reducer 

const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: action.sortBy
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: action.sortBy
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
}


// Get visible expenses

const getVisibleExpenses  = (expenses,{text, sortBy ,startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const EndDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && EndDateMatch && textMatch;
    }).sort((a,b)=> {
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    })
}

//Store creation

const store = createStore(combineReducers({
    expenses: expenseReducer,
    filter: filterReducer
}));

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses,state.filter);
    console.log(visibleExpenses);

})


const expenseOne = store.dispatch(addExpense({ description: 'Rent Agreement', amount: 100000 ,createdAt: -21000}))
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300 , createdAt: -1000}))

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id,{ amount : 500}))
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());


// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));