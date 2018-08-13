package demo02;

/**
 * Created by jiangf001 on 2018/8/13.
 */
public class PackClass {
    public void testString() {
        int c = 10;
        String str1 = Integer.toString(c);
        String str2 = String.valueOf(c);
        String str3 = c + "";
        String str = "8";
        int d = Integer.parseInt(str);
        int e = Integer.valueOf(str);
        System.out.println(str1);
        System.out.println(str2);
        System.out.println(str3);
        System.out.println(d);
        System.out.println(e);
    }
    public void testInteger() {
        int score1 = 86;
        Integer score2 = new Integer(score1);
        double score3 = score2.doubleValue();
        float score4 = score2.floatValue();
        int score5 = score2.intValue();
        System.out.println("Integer包装类：" + score2);
        System.out.println("double类型：" + score3);
        System.out.println("float类型：" + score4);
        System.out.println("int类型：" + score5);
    }
    public static void main(String[] args) {
        PackClass pc = new PackClass();
//        pc.testInteger();
        pc.testString();
    }
}
