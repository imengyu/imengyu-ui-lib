import React from "react";
import CheckTools from "../../utils/CheckTools";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { Color } from "../../styles/ColorStyles";
import { border, selectStyleType } from "../../utils/StyleTools";
import { RowView } from "../layout/RowView";
import { Iconfont } from "../Iconfont";


export interface RadioProps {
  /**
   * 是否选中 单选框
   */
  value?: boolean;
  /**
   * 当前单选框在单选框组中的value，不能与其他重复
   */
  name?: string|number;
  /**
   * 单选框的文字
   */
  text?: string;
  /**
   * 单选框的文字
   */
  children?: string;
  /**
   * 是否禁用单选框
   */
  disabled?: boolean;
  /**
   * 单选框的形状
   */
  shape?:"square"|"round";
  /**
   * 单选框内部形状
   * * color 一个纯色形状
   * * check 一个图标
   */
  checkType?: 'color'|'check';
  /**
   * 单选框内部形状，在 checkType 为 check 时有效。
   */
  checkIconName?: string;
  /**
   * 单选框的颜色，默认是 primary
   */
  color?: string;
  /**
   * 禁用时的颜色，默认是 grey
   */
  disabledColor?: string|undefined;
  /**
   * 文字颜色
   */
  textColor?: string;
  /**
   * 自定义文字样式
   */
  textStyle?: TextStyle;
  /**
   * 自定义样式
   */
  style?: ViewStyle;
  /**
   * 用户更改选中时发生
   */
  onValueChange?: (value: boolean) =>  void;
  /**
   * 自定义渲染单选框按钮的回调
   */
  renderButton?: (on: boolean) => JSX.Element;
}

/**
 * 单选框
 */
export function Radio(props: RadioProps) {

  function switchOn() {
    if (props.disabled)
      return;
    if (typeof props.onValueChange === 'function')
      props.onValueChange(!props.value);
  }

  const text = props.children || props.text;

  return (
    <RowView touchable onPress={switchOn} style={{ ...styles.radioBox, ...props.style}}>
      {
        props.renderButton ?
          props.renderButton(props.value || false) :
          <RadioDefaultButton
            on={props.value || false}
            disabled={props.disabled || false}
            shape={props.shape}
            color={props.color}
            disabledColor={props.disabledColor}
          />
      }
      <Text style={{
        ...styles.radioText,
        ...props.textStyle,
        color: props.disabled === true ? Color.grey : (props.textColor || Color.text),
        display: CheckTools.isNullOrEmpty(text) ? 'none' : 'flex',
      }}>{text}</Text>
    </RowView>
  );
}

export interface RadioGroupProps {
  /**
   * 当前单选框组选中的项目
   */
  value?: string|number;
  /**
   * 是否禁用整组单选框，设置后会禁用全部单选框。
   */
  disabled?: boolean;
  /**
   * 用户更改选中时发生
   */
  onValueChange?: (value: string|number) =>  void;
    /**
   * 渲染子check事件，这通常可以用于check不在一级子的情况, 需要使用 wapper 包装你的 复选框，才能使它响应数据<br/>
   * 例如：
   * ```
   * <RadioGroup value={checked4} onChange={(v) => setChecked4(v)} renderChildren={(wrapper, ) => ([
   *   <Cell key="1" title="单选框 1" center renderRight={() => wrapper(<Radio name="0" />)} />,
   *   <Cell key="2" title="单选框 2" center renderRight={() => wrapper(<Radio name="1" />)} />,
   *   <Cell key="3" title="单选框 2" center renderRight={() => wrapper(<Radio name="2" />)} />,
   * ])} />
   * ```
   */
  renderChildren?: (wapperRadio: (radio: JSX.Element) => JSX.Element) => JSX.Element|JSX.Element[];

  children?: JSX.Element[];
}

/**
 * 单选框组
 */
export function RadioGroup(props: RadioGroupProps) {

  const radioArrays = [] as JSX.Element[];
  const disabled = props.disabled === true;

  function onValueChange(name: string|number|undefined) {
    if (typeof props.onValueChange === 'function')
      props.onValueChange(name || '');
  }

  props.children?.forEach((item) => {
    const name = item.props.name;
    if (name) {
      radioArrays.push(
        React.cloneElement(
          item,
          {
            key: name,
            value: props.value === name,
            disabled: disabled ? true : undefined,
            onValueChange: () => onValueChange(name),
          } as RadioProps
        )
      );
    }
  });

  if (props.renderChildren) {
    const ret = props.renderChildren((radio) => React.cloneElement(
      radio,
      {
        key: radio.props.name,
        value: props.value === radio.props.name,
        disabled: disabled ? true : undefined,
        onValueChange: () => onValueChange((radio.props as RadioProps).name),
      } as RadioProps
    ));

    if (ret instanceof Array)
      radioArrays.push(...ret);
    else
      radioArrays.push(ret);
  }

  return (
    <>{radioArrays}</>
  );
}

export interface RadioDefaultButtonProps {
  on: boolean;
  disabled: boolean;
  color: string|undefined;
  disabledColor: string|undefined;
  checkType?: 'color'|'check';
  checkIconName?: string;
  shape?:"square"|"round";
}

/**
 * 默认的单选框按钮样式
 */
export function RadioDefaultButton(props: RadioDefaultButtonProps) {

  return (
    <View style={{
      ...styles.radioButtonOutView,
      ...selectStyleType(props.shape, 'round', {
        round: { borderRadius: 10 },
        square: { borderRadius: 0 },
      }),
      borderColor: props.disabled === true ? (props.disabledColor || Color.grey) : (props.color || Color.primary),
    }}>
      {
        props.on ?
        (props.checkType === 'check' ?
          <Iconfont
            style={styles.radioButtonInnerCheck}
            icon={props.checkIconName || 'select'}
          /> :
          <View style={{
            ...styles.radioButtonInnerView,
            ...selectStyleType(props.shape, 'round', {
              round: { borderRadius: 8 },
              square: { borderRadius: 0 },
            }),
            backgroundColor: props.disabled === true ? (props.disabledColor || Color.grey) : (props.color || Color.primary),
          }} />
        ) : <></>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  radioButtonOutView: {
    width: 20,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginRight: 4,
    ...border(1, 'solid', Color.primary),
  },
  radioButtonInnerView: {
    width: 12,
    height: 12,
    overflow: 'hidden',
  },
  radioButtonInnerCheck: {
    width: 20,
    height: 20,
    overflow: 'hidden',
  },
  radio: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioBox: {
    marginHorizontal: 4,
  },
  radioText: {
    fontSize: 14,
  },
});

