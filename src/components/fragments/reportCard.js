import React from 'react';
import '../css/reportCard.css';

class ReportCard extends React.Component {
    render() {
        return (
            <main class="px-4 pt-4" id="ReportCard">
                <div class="">
                    <h1 id="title" class="mb-0">
                        {this.props.ReportTitle}
                    </h1>
                    <p class="description">In this weeks</p>
                </div>
                <div class="mt-3"> 
                    <p id="SummaryData" class="text-primary text-center mb-0">{this.props.SummaryReport}</p>
                    <p class="description text-center mb-5">{this.props.Description}</p>
                </div>
            </main>
        )
    }
}


export default ReportCard