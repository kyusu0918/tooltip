/********************************************************************************
 * ツールチップティラノビルダープラグイン設定 ver1.0.0
 *
 * @since 2024/01/15
 * @author Kei Yusu
 *
 *********************************************************************************/
'use strict';
module.exports = class plugin_setting {
    
    constructor(TB) {
        
        /* TBはティラノビルダーの機能にアクセスするためのインターフェスを提供する */
        this.TB = TB;
        
        /* プラグイン名を格納する */
        this.name= TB.$.s("ツールチッププラグイン");
        
        /*プラグインの説明文を格納する*/
        this.plugin_text= TB.$.s("テキストに簡単な説明やヒントを付加するツールチップの機能を使えるようにします。");
        
        /*プラグイン説明用の画像ファイルを指定する。プラグインフォルダに配置してください*/
        this.plugin_img = "tooltip.png";
        
    }
    
    
    /* プラグインをインストールを実行した時１度だけ走ります。フォルダのコピーなどにご活用ください。*/
    triggerInstall(){
        
        /*
        //プラグインからプロジェクトにファイルをコピーするサンプルです 
        var project_path = TB.getProjectPath() ; 
        var from_path = project_path + "data/others/plugin/plugin_template/copy_folder";
        var to_path = project_path + "data/image/copy_folder";
        TB.io.copy(from_path,to_path);
        */
        
    }
        
    /*
        追加するコンポーネントを定義します。
    */

    defineComponents(){
        
        var cmp = {};
        var TB = this.TB;
                        
        /********************************************************************************
         * ツールチップコンフィグタグ作成
         *
         * @param text_color テキストカラー
         * @param position ツールチップ表示位置
         * @param desc_fontsize ツールチップフォントサイズ
         * @param desc_color ツールチップフォントカラー
         * @param desc_backcolor ツールチップ背景カラー
         * @since 2024/01/15
         * @author Kei Yusu
         * 
         *********************************************************************************/
        cmp["tooltip_config"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("ツールチップ設定"), /* コンポーネント名称 */
                "help":TB.$.s("ツールチップの初期値を設定します。"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("ツールチップ設定"), /* コンポーネント名称 */
                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                /*ビューに渡す値*/
                default_view : {
                    base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "0xFFFF99", /*変更しない*/
                    category : "plugin" /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{

                    // テキストカラー
                    "text_color" : {
                        type : "Color",
                        name : TB.$.s("テキストカラー"),
                        default_val : "0x90ee90",
                        validate : {
                            required : true
                        },
                        help : TB.$.s("ツールチップ対象のテキストカラーを設定してください。"),
                    },

                    // ツールチップ表示位置
                    "position" : {
                        type : "Select",
                        select_list : [
                          {
                            name : TB.$.s("テキストの上"),
                            val : "top"
                          },
                          {
                            name : TB.$.s("テキストの下"),
                            val : "bottom"
                          },
                          {
                            name : TB.$.s("テキストの左"),
                            val : "left"
                          },
                          {
                            name : TB.$.s("テキストの右"),
                            val : "right"
                          }
                        ],
                        default_val : "top",
                        name : TB.$.s("表示位置"),
                        help : TB.$.s("ツールチップの表示位置を選択してください。")

                    },

                    // ツールチップフォントサイズ                    
                    "desc_fontsize" : {
                        type : "Num", /*Numは数字入力を設定できます*/
                        name : "ツールチップフォントサイズ", /*パラメータ名*/
                        unit : "", /*単位を表示できます*/
                        help : TB.$.s("ツールチップのフォントサイズを設定してください。"),
                        
                        default_val : 12, /*初期値*/
                        
                        /*spinnerは数値をスピナー形式で表現します*/
                        spinner : {
                            min : 0, /*入力の最小値*/
                            max : 99, /*入力の最大値*/
                            step : 1 /*スピナーを１回動かした時のステップ値*/
                        },
                        
                        validate : {
                            number : true /*数値か否かのチェックを有効化*/
                        }

                    },

                    // ツールチップフォントカラー
                    "desc_color" : {
                        type : "Color",
                        name : TB.$.s("ツールチップテキストカラー"),
                        default_val : "0xffffff",
                        validate : {
                            required : true
                        },
                        help : TB.$.s("ツールチップのテキストカラーを設定してください。"),
                    },

                    // ツールチップ背景カラー
                    "desc_backcolor" : {
                        type : "Color",
                        name : TB.$.s("ツールチップ背景カラー"),
                        default_val : "0x808080",
                        validate : {
                            required : true
                        },
                        help : TB.$.s("ツールチップの背景カラーを設定してください。"),
                    },
                    
                },
                
                /*
                    途中からプレビューの時に実行するタグを返す。
                    例えば背景変更の機能をもったコンポーネントの場合、
                    途中からプレビューのときに背景変更のタグを実行しておかないと
                    途中からプレビューにこのコンポーネントが反映されません。
                    timeなどの時間は短くしておく必要があります。
                */
                /*
                preview_tag:function(preview,cmp){
                    
                    var storage = cmp.data.pm["storage"]; 
                    
                    //返却用のタグを設定
                    preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";
                             
                },
                */
            
            }
            
        };
        
        /********************************************************************************
         * ツールチップ登録タグ
         *
         * @param id ID
         * @param desc デスクリプション
         * @param memo メモ
         * @since 2024/01/15
         * @author Kei Yusu
         * 
         *********************************************************************************/ 
        cmp["tooltip_set"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("ツールチップ登録"), /* コンポーネント名称 */
                "help":TB.$.s("ツールチップストアにデータを登録します。"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("ツールチップ登録"), /* コンポーネント名称 */
                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                header: function(e){

                    return e.data.pm.memo || ""

                },

                /*ビューに渡す値*/
                default_view : {
                    base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin" /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{
                
                    // ID
                    "id" : {
                        type : "Text",
                        name : TB.$.s("ID"),
                        help : TB.$.s("ツールチップデータのIDを設定してください。"),
                        validate : {
                            required : true,
                        },

                        /*
                            onChangeメソッド 
                            テキストが変更されたタイミングで、手動でパラメータを設定する必要があります。
                            Textの場合は必須です。
                        */
                        onChange : function(val, component) {
                            TB.component.changeParam(component, "id", val);
                        }

                    },

                    // ツールチップ説明文
                    "desc" : {
                        type : "Text",
                        name : TB.$.s("説明文"),
                        help : TB.$.s("ツールチップに表示する説明文を設定してください。"),
                        validate : {
                            required : false,
                        },

                        /*
                            onChangeメソッド 
                            テキストが変更されたタイミングで、手動でパラメータを設定する必要があります。
                            Textの場合は必須です。
                        */
                        onChange : function(val, component) {
                            TB.component.changeParam(component, "desc", val);
                        }
    
                    },

                    // ツールチップメモ
                    "memo" : {
                        type : "Text",
                        name : TB.$.s("メモ"),
                        help : TB.$.s("メモ欄です。ご自由にお使いください。"),
                        validate : {
                            required : false,
                        },

                        /*
                            onChangeメソッド 
                            テキストが変更されたタイミングで、手動でパラメータを設定する必要があります。
                            Textの場合は必須です。
                        */
                        onChange : function(val, component) {
                            TB.component.changeParam(component, "memo", val);
                        }
    
                    },
                    
                },
                
                /*
                    途中からプレビューの時に実行するタグを返す。
                    例えば背景変更の機能をもったコンポーネントの場合、
                    途中からプレビューのときに背景変更のタグを実行しておかないと
                    途中からプレビューにこのコンポーネントが反映されません。
                    timeなどの時間は短くしておく必要があります。
                */
                /*
                preview_tag:function(preview,cmp){
                    
                    var storage = cmp.data.pm["storage"]; 
                    
                    //返却用のタグを設定
                    preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";
                             
                },
                */
            
            }
            
        };

        /********************************************************************************
         * ツールチップ削除タグ
         *
         * @param id ID
         * @param desc デスクリプション
         * @since 2024/01/15
         * @author Kei Yusu
         * 
         *********************************************************************************/ 
        cmp["tooltip_del"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("ツールチップ削除"), /* コンポーネント名称 */
                "help":TB.$.s("ツールチップストアのデータを削除します。"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("ツールチップ削除"), /* コンポーネント名称 */
                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                header: function(e){
                    
                    return e.data.pm.id || "";

                },

                /*ビューに渡す値*/
                default_view : {
                    base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin" /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{

                    // ID
                    "id" : {
                        type : "Text",
                        name : TB.$.s("ID"),
                        help : TB.$.s("ツールチップデータのIDを設定してください。"),
                        validate : {
                            required : true,
                        },

                        /*
                            onChangeメソッド 
                            テキストが変更されたタイミングで、手動でパラメータを設定する必要があります。
                            Textの場合は必須です。
                        */
                        onChange : function(val, component) {
                            TB.component.changeParam(component, "id", val);
                        }

                    },

                },
                
                /*
                    途中からプレビューの時に実行するタグを返す。
                    例えば背景変更の機能をもったコンポーネントの場合、
                    途中からプレビューのときに背景変更のタグを実行しておかないと
                    途中からプレビューにこのコンポーネントが反映されません。
                    timeなどの時間は短くしておく必要があります。
                */
                /*
                preview_tag:function(preview,cmp){
                    
                    var storage = cmp.data.pm["storage"]; 
                    
                    //返却用のタグを設定
                    preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";
                             
                },
                */
            
            }
            
        };

        /********************************************************************************
         * ツールチップクリアタグ
         *
         * @since 2024/01/15
         * @author Kei Yusu
         * 
         *********************************************************************************/ 
        cmp["tooltip_clear"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("ツールチップクリア"), /* コンポーネント名称 */
                "help":TB.$.s("ツールチップの設定とストアデータを全てクリアします。"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("ツールチップクリア"), /* コンポーネント名称 */
                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                /*ビューに渡す値*/
                default_view : {
                    base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin" /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{                    
                },
                
                /*
                    途中からプレビューの時に実行するタグを返す。
                    例えば背景変更の機能をもったコンポーネントの場合、
                    途中からプレビューのときに背景変更のタグを実行しておかないと
                    途中からプレビューにこのコンポーネントが反映されません。
                    timeなどの時間は短くしておく必要があります。
                */
                /*
                preview_tag:function(preview,cmp){
                    
                    var storage = cmp.data.pm["storage"]; 
                    
                    //返却用のタグを設定
                    preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";
                             
                },
                */
            
            }
            
        };

        // 戻り値の設定
        return cmp;

    }
    
    test(){}

}

