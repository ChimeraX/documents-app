import { connect } from 'react-redux';
import Title, { TitleProperties } from '@chimerax/common-web/lib/widgets/Title';
import ChimeraXAppState from '../redux/ChimeraXAppState';

const mapStateToProps = (state: ChimeraXAppState, properties?: Partial<TitleProperties>) => {
    return {
        icon: 'bubble_chart',
        text: 'Chimera-X',
    };
};

export default connect(mapStateToProps)(Title);
