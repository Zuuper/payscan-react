import React from 'react';
import '../css/filter.css';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FilterName: 'Filter',
            TypeFilter1: 'Category',
            TypeFilter2: 'Supplier',
            TypeFilterList1: ['snack', 'food', 'tea'],
            TypeFilterList2: ['PT Indah Perkasa', 'Bank Jago'],
        }
    }
     
    render() {
        return (
            <div>
                <div id="filter-section"
                    class="container-fluid py-4 d-flex justify-content-between align-items-center">
                    <div class="d-flex justify-content-start align-items-center">
                        <h2 class="mr-5"> {this.props.FilterName}</h2>
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Filter;