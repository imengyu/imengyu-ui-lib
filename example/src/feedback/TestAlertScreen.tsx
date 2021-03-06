import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { ColumnView, CellGroup, Cell, ActionSheetNative, Toast, AlertNative } from 'imengyu-ui-lib';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestAlert'>;

export class TestAlertScreen extends React.PureComponent<Props> {

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center>
          <CellGroup title="原生对话框" inset>
            <Text style={{ padding: 10 }}>对原生的 Alert、ActionSheet 进行了封装。</Text>
            <Cell title="Alert.alert" showArrow onPress={() => {
              AlertNative.alert('提示', '这是一个弹出对话框');
            }} />
            <Cell title="Alert.prompt" showArrow onPress={() => {
              AlertNative.prompt('提示', '请输入文字', (v) => {
                Toast.info('你输入了' + v);
              });
            }} />
            <Cell title="ActionSheet" showArrow onPress={() => {
              ActionSheetNative.showNativeActionSheetWithOptions({
                options: [
                  '选项1',
                  '选项2',
                  '选项3',
                  '选项4',
                ],
                showCancel: true,
                cancelButtonIndex: 4,
              }, (i) => {
                Toast.info('点击了' + i);
              });
            }} />
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

