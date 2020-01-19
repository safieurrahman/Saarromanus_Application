import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import SightDetailsScreen from './index';
import ImageGallery from '../../components/image-gallery';
import AudioPlayer from '../../components/audio-player';
import TextBox from '../../components/text-box';

const mockStore = configureStore();

const mockFn = jest.fn();
const navigation = {
	navigate: mockFn,
};

const initialState = {
	config: { checkForUpdate: false },
	sight: {
		id: '85LOt9BO7RACVo4ShrAK',
		fr: {
			name: 'Université de Sarre',
			information:
				"L'Université de la Sarre est une université de recherche moderne située à Sarrebruck, la capitale du Land de Sarre. Elle a été fondée en 1948 à Homburg en coopération avec la France et est organisée en six facultés qui couvrent tous les principaux domaines scientifiques.",
		},
		en: {
			name: 'Saarland University',
			information:
				'Saarland University is a modern research university located in Saarbrücken, the capital of the German state of Saarland. It was founded in 1948 in Homburg in co-operation with France and is organized in six faculties that cover all major fields of science.',
		},
		de: {
			name: 'Universität des Saarlandes',
			information:
				'Die Universität des Saarlandes ist eine moderne Forschungsuniversität mit Sitz in Saarbrücken, der Hauptstadt des Saarlandes. Sie wurde 1948 in Zusammenarbeit mit Frankreich in Homburg gegründet und ist in sechs Fakultäten organisiert, die alle wichtigen Wissenschaftsbereiche abdecken.',
		},
		coordinate: {
			latitude: 49.2636037,
			longitude: 7.0274844,
		},
		sight_category: {
			id: '2DEZplgST07PTogH9JWX',
			en: {
				name: 'Siedlungen',
			},
			fr: {
				name: 'Règlements',
			},
			de: {
				name: 'Settlements',
			},
		},
		resources: [
			{
				url:
					'https://firebasestorage.googleapis.com/v0/b/saarromanus-519b6.appspot.com/o/images%2F1579035923555_Saarland%20Uni.jpg?alt=media&token=7061299b-9bba-4573-b695-340f5813bfe0',
				title: '1579035923555_Saarland Uni.jpg',
				type: 'image/jpg',
			},
			{
				url:
					'https://firebasestorage.googleapis.com/v0/b/saarromanus-519b6.appspot.com/o/images%2F1579035924453_uds_luftbild_3-2.jpg?alt=media&token=48888961-250f-45e5-a06e-07313b514b4c',
				title: '1579035924453_uds_luftbild_3-2.jpg',
				type: 'image/jpg',
			},
			{
				url:
					'https://firebasestorage.googleapis.com/v0/b/saarromanus-519b6.appspot.com/o/audio%2F1579063827510_The%20Chainsmokers%20-%20All%20We%20Know%20ft.%20Phoebe%20Ryan.mp3?alt=media&token=ce917aa8-7ed3-41fe-9174-fa1ed4753713',
				title:
					'1579063827510_The Chainsmokers - All We Know ft. Phoebe Ryan.mp3',
				type: 'audio/mpeg',
			},
			{
				url:
					'https://firebasestorage.googleapis.com/v0/b/saarromanus-519b6.appspot.com/o/audio%2F1579064650136_Break%20The%20Silence%20%20%20The%20Dig%20%20%20Midnight%20Flowers.mp3?alt=media&token=dd6cbf67-49d1-4b57-9d4b-099350e0e161',
				title:
					'1579064650136_Break The Silence   The Dig   Midnight Flowers.mp3',
				type: 'audio/mpeg',
			},
			{
				url:
					'https://firebasestorage.googleapis.com/v0/b/saarromanus-519b6.appspot.com/o/audio%2F1579064656787_Apparat%20-%20Goodbye%20(feat.%20Soap%26Skin).mp3?alt=media&token=92e6a71d-a76e-4e48-94d6-70fc61c14d23',
				title: '1579064656787_Apparat - Goodbye (feat. Soap&Skin).mp3',
				type: 'audio/mpeg',
			},
		],
	},
};

let wrapper;
let store;
let component;

beforeAll(() => {
	store = mockStore(initialState);
	wrapper = shallow(
		<SightDetailsScreen store={store} navigation={navigation} />
	).dive();
	component = wrapper.dive();
});

describe('<SightDetailsScreen />', () => {
	it('renders properly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('has one main <ScrollView /> component', () => {
		expect(
			component.find(`[data-test-id='scrollViewMainContainer']`).length
		).toBe(1);
	});

	describe('<ScrollView />', () => {
		it('has one custom component called <ImageGallery />', () => {
			expect(component.find(ImageGallery).length).toBe(1);
		});

		it('has one custom component called <AudioPlayer />', () => {
			expect(component.find(AudioPlayer).length).toBe(1);
		});

		it('has one custom component called <TextBox />', () => {
			expect(component.find(TextBox).length).toBe(1);
		});

		it('has five child components', () => {
			expect(
				component
					.find(`[data-test-id='scrollViewMainContainer']`)
					.children().length
			).toBe(5);
		});
	});
});
