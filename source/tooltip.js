/********************************************************************************
 * ツールチップティラノスクリプトプラグイン ver1.2.0
 *
 * @since 2026/01/28
 * @author Kei Yusu
 *
 *********************************************************************************/
(function(){

  /********************************************************************************
   * ツールチップコンフィグタグ作成
   *
   * @param text_color テキストカラー
   * @param position ツールチップ表示位置
   * @param desc_fontsize ツールチップフォントサイズ
   * @param desc_color ツールチップフォントカラー
   * @param desc_backcolor ツールチップ背景カラー
   * @param desc_height ツールチップ高さ
   * @param desc_width ツールチップ幅
   * @since 2024/01/13
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const tooltip_config = {
    kag: TYRANO.kag,
    vital: [],
    pm: {
      text_color: "",
      position: "",
      desc_fontsize: 0, 
      desc_color: "",
      desc_backcolor: "",
      desc_height: "",
      desc_width: "",
    },
    start : function(pm) {

      // コンフィグ初期化
      initConfig();

      // テキストカラーが省略されていない場合
      if(pm.text_color){

        // テキストカラーを設定
        TYRANO.kag.variable.sf.tooltip_config.text_color = $.convertColor(pm.text_color);

      }

      // ポジションが省略されていない場合
      if(pm.position){

        // ポジション設定
        TYRANO.kag.variable.sf.tooltip_config.position = pm.position;

      }

      // ツールチップフォントサイズが省略されていない場合
      if(pm.desc_fontsize != 0){

        // ツールチップフォントサイズ設定
        TYRANO.kag.variable.sf.tooltip_config.desc_fontsize = isNumeric(pm.desc_fontsize) ? parseInt(pm.desc_fontsize) : 12;

      }

      // ツールチップカラーが省略されていない場合
      if(pm.desc_color){

        // ツールチップカラー設定
        TYRANO.kag.variable.sf.tooltip_config.desc_color = $.convertColor(pm.desc_color);

      }

      // ツールチップ背景カラーが省略されていない場合
      if(pm.desc_backcolor){

        // ツールチップ背景カラー設定
        TYRANO.kag.variable.sf.tooltip_config.desc_backcolor = $.convertColor(pm.desc_backcolor);

      }

      // ツールチップ高さが省略されていない場合
      if(pm.desc_height){

        // ツールチップ高さ設定
        TYRANO.kag.variable.sf.tooltip_config.desc_height = pm.desc_height;

      }

      // ツールチップ幅が省略されていない場合
      if(pm.desc_width){

        // ツールチップ幅設定
        TYRANO.kag.variable.sf.tooltip_config.desc_width = pm.desc_width;

      }

      // 次のタグへ
      this.kag.ftag.nextOrder();

    }

  }

  // ツールチップコンフィグタグ追加
  TYRANO.kag.ftag.master_tag.tooltip_config = object(tooltip_config);
  TYRANO.kag.ftag.master_tag.tooltip_config.kag = TYRANO.kag;

  /********************************************************************************
   * ツールチップ登録タグ作成
   *
   * @param id ID
   * @param desc ツールチップ説明文
   * @param memo メモ
   * @since 2024/01/13
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const tooltip_set = {
    kag: TYRANO.kag,
    vital: ["id"],
    pm: {
      desc: "",
      memo: "",
    },
    start : function(pm) {

      // ストア配列がない場合
      if(TYRANO.kag.variable.sf.tooltip_store == undefined){

        // ストア配列作成
        TYRANO.kag.variable.sf.tooltip_store = [];

      }

      // ツールチップデータ取得
      const tooltip_data = TYRANO.kag.variable.sf.tooltip_store.find(it => it.id == pm.id);

      // ツールチップデータがある場合
      if(tooltip_data){

        // ツールチップ説明文更新
        tooltip_data.desc = pm.desc;

        // ツールチップメモ更新
        tooltip_data.memo = pm.memo;

      // ツールチップデータない場合
      }else{

        // ツールチップデータ新規作成
        const tooltip_data = {
          id: pm.id,
          desc: pm.desc,
          memo: pm.memo,
        }

        // ツールチップデータ追加
        TYRANO.kag.variable.sf.tooltip_store.push(tooltip_data);

      }

      // 次のタグへ
      this.kag.ftag.nextOrder();

    }

  }

  // ツールチップコンフィグタグ追加
  TYRANO.kag.ftag.master_tag.tooltip_set = object(tooltip_set);
  TYRANO.kag.ftag.master_tag.tooltip_set.kag = TYRANO.kag;

  /********************************************************************************
   * ツールチップ削除タグ作成
   *
   * @param id ID
   * @since 2024/01/13
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const tooltip_del = {
    kag: TYRANO.kag,
    vital: ["id"],
    pm: {
    },
    start : function(pm) {

      // ストア配列がある場合
      if(TYRANO.kag.variable.sf.tooltip_store != undefined){

        // 指定ID以外でストア配列を再作成
        TYRANO.kag.variable.sf.tooltip_store = TYRANO.kag.variable.sf.tooltip_store.filter(it => it.id != pm.id);

      }

      // 次のタグへ
      this.kag.ftag.nextOrder();

    }

  }

  // ツールチップコンフィグタグ追加
  TYRANO.kag.ftag.master_tag.tooltip_del = object(tooltip_del);
  TYRANO.kag.ftag.master_tag.tooltip_del.kag = TYRANO.kag;

  /********************************************************************************
   * ツールチップ関連クリアタグ作成
   *
   * @since 2024/01/13
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const tooltip_clear = {
    kag: TYRANO.kag,
    vital: [],
    pm: {
    },
    start : function(pm) {

      // コンフィグオブジェクトがある場合
      if(TYRANO.kag.variable.sf.tooltip_config != undefined){

        // コンフィグオブジェクト削除
        delete TYRANO.kag.variable.sf.tooltip_config;

      }

      // ストア配列がある場合
      if(TYRANO.kag.variable.sf.tooltip_store != undefined){

        // ストア配列削除
        delete TYRANO.kag.variable.sf.tooltip_store

      }

      // フォントカラーキャッシュがある場合
      if(TYRANO.kag.variable.tf.tooltip_config_cache_font_color != undefined){

        // フォントカラーキャッシュ削除
        delete TYRANO.kag.variable.tf.tooltip_config_cache_font_color;

      }

      // 次のタグへ
      this.kag.ftag.nextOrder();

    }

  }

  // ツールチップコンフィグタグ追加
  TYRANO.kag.ftag.master_tag.tooltip_clear = object(tooltip_clear);
  TYRANO.kag.ftag.master_tag.tooltip_clear.kag = TYRANO.kag;

  /********************************************************************************
   * ツールチップ開始タグ作成
   *
   * @param id ID
   * @param text_color テキストカラー
   * @param desc ツールチップ説明文
   * @param position ツールチップ表示位置
   * @param desc_fontsize ツールチップフォントサイズ
   * @param desc_color ツールチップフォントカラー
   * @param desc_backcolor ツールチップ背景カラー
   * @param desc_height ツールチップ高さ
   * @param desc_width ツールチップ幅
   * @since 2026/01/28
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const tooltip = {
    kag: TYRANO.kag,
    vital: [],
    pm: {
      id: "",
      text_color: "",
      desc: "",
      position: "",
      desc_fontsize: 0, 
      desc_color: "",
      desc_backcolor: "",
      desc_height: "",
      desc_width: "",
    },
    start : function(pm) {

      // コンフィグオブジェクト初期化
      initConfig();

      // ツールチップ説明文を取得
      const desc = pm.desc != "" ? pm.desc : getDescFromStore(pm.id);

      // ツールチップ説明文を取得できた場合
      if(desc){

        //--------------------------------------------------------------------------------
        // パラメータ取得
        //--------------------------------------------------------------------------------
        // テキストカラー取得
        const text_color = $.convertColor(pm.text_color) || TYRANO.kag.variable.sf.tooltip_config.text_color;

        // ツールチップ表示位置取得
        const position = getPosition(pm.position || TYRANO.kag.variable.sf.tooltip_config.position);

        // ツールチップフォントサイズ取得
        const getDescfontsize = pm.desc_fontsize || TYRANO.kag.variable.sf.tooltip_config.desc_fontsize;
        const desc_fontsize = isNumeric(getDescfontsize) ? parseInt(getDescfontsize) : 0;

        // ツールチップカラー取得
        const desc_color = $.convertColor(pm.desc_color) || TYRANO.kag.variable.sf.tooltip_config.desc_color;

        // ツールチップ背景カラー取得
        const desc_backcolor = $.convertColor(pm.desc_backcolor) || TYRANO.kag.variable.sf.tooltip_config.desc_backcolor;

        // ツールチップ高さ取得
        const desc_height = pm.desc_height || TYRANO.kag.variable.sf.tooltip_config.desc_height;

        // ツールチップ幅取得
        const desc_width = pm.desc_width || TYRANO.kag.variable.sf.tooltip_config.desc_width;

        //--------------------------------------------------------------------------------
        // テキスト用Span設定
        //--------------------------------------------------------------------------------
        // フォントカラーキャッシュの初期値を設定
        // ※既読テキスト対策のため、CSSでのカラー設定へ変更したためコメントアウト
        // TYRANO.kag.variable.tf.tooltip_config_cache_font_color = "";

        // テキストカラーが指定されている場合
        // if(text_color){

          // 現在のフォントカラーをキャッシュ
          // TYRANO.kag.variable.tf.tooltip_config_cache_font_color = TYRANO.kag.stat.font.color;

          // テキストカラー設定
          // TYRANO.kag.stat.font.color = text_color;
          
        // }

        // テキスト用Span取得
        const spanText = TYRANO.kag.setMessageCurrentSpan();

        // テキスト用Spanにtooltipクラスを設定
        spanText.addClass("tooltip");

        // ツールチップテキストカラー設定
        spanText.css("--tooltip-text-color", text_color);

        // テキスト用Spanにツールチップ説明文用を設定
        // ※イベントのセンダーオブジェクトを経由してツールチップ説明文を使用する場合は設定する
        // spanText.attr("data-desc", desc);

        // タッチデバイス用にontouchstartを設定
        spanText.attr("ontouchstart", "");

        //--------------------------------------------------------------------------------
        // ツールチップ説明文用span設定
        //--------------------------------------------------------------------------------      
        // ツールチップ説明文用spanを作成
        const spanDesc = $(`<span class="${position}">${desc}</span>`);

        // ツールチップフォントサイズが指定されている場合
        if(desc_fontsize != 0){

          // ツールチップフォンとサイズ設定
          spanDesc.css({
            "font-size": `${desc_fontsize.toString()}px`,
          });

        }
        
        // ツールチップカラーが指定されている場合
        if(desc_color){

          // ツールチップカラー設定
          spanDesc.css({
            "color": `${desc_color}`,
          });

        }

        // ツールチップ背景カラーが指定されている場合
        if(desc_backcolor){
          
          // ツールチップ背景カラー設定
          spanDesc.css({
            "background": `${desc_backcolor}`,
            "border-color": `${desc_backcolor}`,
          });

        }

        // ツールチップ高さが指定されている場合
        if(desc_height){
          
          // ツールチップ高さ設定
          spanDesc.css({
            "height": `${desc_height}`
          });

        }

        // ツールチップ幅が指定されている場合
        if(desc_width){
          
          // ツールチップ幅設定
          spanDesc.css({
            "width": `${desc_width}`
          });

        }
        
        //--------------------------------------------------------------------------------
        // HTMLタグ追加
        //--------------------------------------------------------------------------------      
        // テキスト用Spanにツールチップ説明文用spanを追加
        spanText.append(spanDesc);

        //--------------------------------------------------------------------------------
        // バックログ調整用設定
        //--------------------------------------------------------------------------------
        // 直前のエレメントを取得
        const prevElem = spanText.prev();

        // 直前のエレメントが空白でなく、テキスト用Spanが同一階層の場合
        if(prevElem.length && prevElem.text() != "" && prevElem.parent().is(spanText.parent())){

          // 行頭フラグをキャッシュ（行頭でない）
          TYRANO.kag.variable.tf.tooltip_config_cache_is_head = false;

        // 上記以外の場合（行頭の場合）
        }else{

          // 行頭フラグをキャッシュ（行頭）
          TYRANO.kag.variable.tf.tooltip_config_cache_is_head = true;

        }

      }
            
      // 次のタグへ
      this.kag.ftag.nextOrder();

    },
  
  }

  // ツールチップ開始タグ追加
  TYRANO.kag.ftag.master_tag.tooltip = object(tooltip);
  TYRANO.kag.ftag.master_tag.tooltip.kag = TYRANO.kag;

  /********************************************************************************
   * ツールチップ終了タグ作成
   *
   * @since 2026/01/28
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const end_tooltip = {
    kag: TYRANO.kag,
    vital: [],
    pm: {},
    start : function(pm) {

      // カレントSpan設定
      const spanText = TYRANO.kag.setMessageCurrentSpan();

      // 先頭文字回避のためにダミーを追加
      const dummy = $(`<span class="tooltip_dummy" style="display:none;">\u200B</span>`);
      spanText.append(dummy);

      // フォントカラーがキャッシュされていた場合
      // ※既読テキスト対策のため、CSSでのカラー設定へ変更したためコメントアウト
      // if(TYRANO.kag.variable.tf.tooltip_config_cache_font_color){

        // テキストカラー設定（元に戻す）
        // TYRANO.kag.stat.font.color = TYRANO.kag.variable.tf.tooltip_config_cache_font_color;

      // }

      // 次のタグへ
      this.kag.ftag.nextOrder();

      // ダミーを削除
      dummy.remove();

      // バックログ調整
      adjustBackLog();

      // キャッシュクリア
      TYRANO.kag.variable.tf.tooltip_config_cache_is_head = undefined;

    }

  }

  // ツールチップ終了タグ追加
  TYRANO.kag.ftag.master_tag.end_tooltip = object(end_tooltip);
  TYRANO.kag.ftag.master_tag.end_tooltip.kag = TYRANO.kag;
  
  /********************************************************************************
   * コンフィグ初期化
   *
   * @since 2024/01/14
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const initConfig = () => {

    // コンフィグオブジェクトがない場合
    if(TYRANO.kag.variable.sf.tooltip_config == undefined){

      // コンフィグオブジェクトの初期値を作成
      const tooltip_config = {
        text_color: "lightgreen",
        position: "top",
        desc_fontsize: 12,
        desc_color: "white",
        desc_backcolor: "gray",
        desc_height: "",
        desc_width: "",
      }

      // コンフィグオブジェクト設定
      TYRANO.kag.variable.sf.tooltip_config = tooltip_config;

    }

  }

  /********************************************************************************
   * データストアからデスクリプションを取得
   *
   * @param id ID
   * @returns デスクリプション
   * @since 2024/01/13
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const getDescFromStore = (id) => {

    // ツールチップストアがない場合は終了
    if(TYRANO.kag.variable.sf.tooltip_store == undefined) return "";
    
    // ツールチップデータ取得
    const tooltip_data = TYRANO.kag.variable.sf.tooltip_store.find(it => it.id == id);

    // 戻り値の設定
    return tooltip_data ? tooltip_data.desc : "";

  }

  /********************************************************************************
   * ポジション用CSSクラス名取得
   *
   * @param position ツールチップ表示位置
   * @returns ポジション用CSSクラス名
   * @since 2024/01/13
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const getPosition = (position) => {

    // ツールチップ表示位置を判断
    switch (position) {

      // 上の場合
      case "top":

        // 戻り値の設定
        return "desc_top"

      // 下の場合
      case "bottom":

        // 戻り値の設定
        return "desc_bottom"

      // 左の場合
      case "left":

        // 戻り値の設定
        return "desc_left"

      // 右の場合
      case "right":

        // 戻り値の設定
        return "desc_right"

      // その他の場合
      default:

        // 戻り値の設定
        return "desc_top";

    }

  }

  /********************************************************************************
   * 数値チェック
   *
   * @param target チェック対象
   * @returns true:数値 / false:数値以外
   * @since 2024/01/09
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const isNumeric = (target) => {

    // 型チェック
    if(!target.toString().match(/^\d+$/)){

      // マッチしない場合は終了
      return false;

    }

    // 戻り値の設定
    return true;

  }

  /********************************************************************************
   * バックログ調整
   *
   * @since 2024/11/13
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const adjustBackLog = () => {

    // バックログを使用しない場合は終了
    if(TYRANO.kag.config.maxBackLogNum == 0) return;

    // バックログ停止中の場合は終了
    if(TYRANO.kag.stat.log_write == false) return;

    // ツールチップ対象テキストの前後のバックログを取得
    const backlogs = [
      TYRANO.kag.variable.tf.system.backlog[TYRANO.kag.variable.tf.system.backlog.length-3],
      TYRANO.kag.variable.tf.system.backlog[TYRANO.kag.variable.tf.system.backlog.length-2],
      TYRANO.kag.variable.tf.system.backlog[TYRANO.kag.variable.tf.system.backlog.length-1]
    ]

    // 取得したバックログ数文ループ
    const joinBackLog = backlogs.reduce((accum, it, index) => {

      // インデックスを判断
      switch(index){

        // ツールチップ対象テキストの前の場合
        case 0:

          // 行頭でない場合
          if(TYRANO.kag.variable.tf.tooltip_config_cache_is_head == false){

            // ログ取得
            accum += it;

          }

          // 終了
          break;

        // ツールチップ対象テキストの場合
        case 1:

          // 行頭の場合
          if(TYRANO.kag.variable.tf.tooltip_config_cache_is_head == true){

            // ログ取得
            accum += it;

          // 行頭でない場合
          } else {

            // キャラ名で分割
            const logs = it.split("：");

            // ログ取得
            accum += logs.length >= 2 ? logs[1] : it;

          }

          // 終了
          break;

        // ツールチップ対象テキストの後ろの場合
        case 2:

          // キャラ名で分割
          const logs = it.split("：");

          // ログ取得
          accum += logs.length >= 2 ? logs[1] : it;

          // 終了
          break;

      }

      // 戻り値の設定
      return accum;

    }, "");

    // 行頭フラグを判断（行頭の場合）
    if(TYRANO.kag.variable.tf.tooltip_config_cache_is_head == true){

      // 改行付バックログを削除
      TYRANO.kag.variable.tf.system.backlog.splice(TYRANO.kag.variable.tf.system.backlog.length - 2, 2);

    // 行頭でない場合
    } else {

      // 改行付バックログを削除
      TYRANO.kag.variable.tf.system.backlog.splice(TYRANO.kag.variable.tf.system.backlog.length - 3, 3);

    }

    // 改行を削除したバックログを追加
    TYRANO.kag.variable.tf.system.backlog.push(joinBackLog);

  }

})();