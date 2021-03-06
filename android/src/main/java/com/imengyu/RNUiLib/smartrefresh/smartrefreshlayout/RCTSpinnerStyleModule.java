package com.imengyu.RNUiLib.smartrefresh.smartrefreshlayout;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import androidx.annotation.NonNull;
import javax.annotation.Nullable;


public class RCTSpinnerStyleModule extends ReactContextBaseJavaModule {
    public RCTSpinnerStyleModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "SpinnerStyleModule";
    }

    /**
     *
     *Translate,//平行移动        特点: HeaderView高度不会改变，
     *Scale,//拉伸形变            特点：在下拉和上弹（HeaderView高度改变）时候，会自动触发OnDraw事件
     *FixedBehind,//固定在背后    特点：HeaderView高度不会改变，
     *FixedFront,//固定在前面     特点：HeaderView高度不会改变，
     *MatchLayout//填满布局
     *
     * @return
     */
    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        return Collections.unmodifiableMap(new HashMap<String, Object>(){{
            put("translate", SpinnerStyleConstants.TRANSLATE);
            put("fixBehind",SpinnerStyleConstants.FIX_BEHIND);
            put("fixFront",SpinnerStyleConstants.FIX_FRONT);
            put("scale",SpinnerStyleConstants.SCALE);
            put("matchLayout",SpinnerStyleConstants.MATCH_LAYOUT);
        }});
    }
}
